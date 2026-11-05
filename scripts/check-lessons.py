#!/usr/bin/env python3
"""Execute the local, sequential exercises from the Markdown in isolated repositories.

Online and graphical workflows need separate checks. The rebase exercise uses
temporary editor scripts to reproduce the choices described in the lesson.
"""
import os
import re
import shlex
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENV = os.environ.copy()
ENV.update({
    "GIT_CONFIG_NOSYSTEM": "1", "GIT_CONFIG_GLOBAL": os.devnull,
    "GIT_AUTHOR_NAME": "Git Student", "GIT_AUTHOR_EMAIL": "student@example.invalid",
    "GIT_COMMITTER_NAME": "Git Student", "GIT_COMMITTER_EMAIL": "student@example.invalid",
    "GIT_TERMINAL_PROMPT": "0", "LC_ALL": "C", "GIT_MERGE_AUTOEDIT": "no",
})


def blocks(path, start=None, end=None):
    text = (ROOT / path).read_text(encoding="utf-8")
    if start:
        text = text.split(start, 1)[1]
    if end:
        text = text.split(end, 1)[0]
    return re.findall(r"```bash\n(.*?)\n```", text, re.S)


def run(script, cwd, label, env=ENV):
    proc = subprocess.run(["bash", "--noprofile", "--norc", "-eo", "pipefail", "-c", script],
                          cwd=cwd, env=env, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if proc.returncode:
        raise RuntimeError(f"{label} failed ({proc.returncode}):\n{proc.stdout}")
    print(f"PASS {label}")
    return proc.stdout


def git(cwd, *args):
    return subprocess.check_output(["git", *args], cwd=cwd, env=ENV, text=True).strip()


def clean(cwd):
    assert git(cwd, "status", "--porcelain") == "", f"{cwd}: uncommitted changes"


def content(cwd, name, expected):
    assert (cwd / name).read_text(encoding="utf-8") == expected, f"{cwd / name}: unexpected content"


def execute(path, cwd, end=None, start=None):
    extracted = blocks(path, start, end)
    assert extracted, f"No shell examples found in {path}"
    return run("\n".join(extracted), cwd, path)


with tempfile.TemporaryDirectory(prefix="git-teaching-check-") as tmp:
    root = Path(tmp)
    execute("開始使用Git/README.md", root)
    repo = root / "git-first"
    clean(repo)
    assert git(repo, "rev-list", "--count", "HEAD") == "3"
    content(repo, "index.txt", "Home page\nAbout our team\nContact us\n")
    execute("開始使用Git/延伸範例.md", repo)
    clean(repo)
    assert (repo / "news.txt").is_file() and (repo / "notes.txt").is_file()

    execute("使用main主要分支/README.md", root)
    repo = root / "history-demo"
    clean(repo)
    assert git(repo, "rev-list", "--count", "HEAD") == "3"
    execute("使用main主要分支/延伸範例.md", repo)
    clean(repo)

    execute("分支/README.md", root)
    repo = root / "branch-demo"
    clean(repo)
    assert git(repo, "branch", "--show-current") == "main"
    content(repo, "login.txt", "Login form\n")
    assert "feature-login" not in git(repo, "branch", "--list")

    extra = blocks("分支/延伸範例.md")
    assert len(extra) == 4
    run("\n".join(extra[:2]), root, "分支延伸：準備分岔")
    repo = root / "merge-demo"
    # The lesson intentionally pauses on merge failure; verify the conflict before
    # reproducing the student's manual edit in the editor.
    conflict = subprocess.run(["bash", "-c", extra[2]], cwd=repo, env=ENV,
                              text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    assert "CONFLICT" in conflict.stdout
    assert git(repo, "status", "--porcelain") == "UU index.txt"
    assert "<<<<<<<" in (repo / "index.txt").read_text()
    (repo / "index.txt").write_text("Hello and welcome\n")
    run(extra[3], repo, "分支延伸：手動解決後提交")
    repo = root / "merge-demo"
    clean(repo)
    content(repo, "index.txt", "Hello and welcome\n")
    assert (repo / "about.txt").exists() and (repo / "contact.txt").exists()

    execute("分支/合併方式比較.md", root)
    repo = root / "merge-compare"
    clean(repo)
    assert git(repo, "rev-parse", "compare-ff") == git(repo, "rev-parse", "feature-login")
    assert len(git(repo, "show", "-s", "--format=%P", "compare-merge").split()) == 2
    assert len(git(repo, "show", "-s", "--format=%P", "compare-squash").split()) == 1
    assert git(repo, "rev-parse", "compare-squash^") == git(repo, "rev-parse", "start")
    for branch in ("compare-merge", "compare-squash", "compare-rebase"):
        assert git(repo, "diff", "compare-ff", branch, "--", "index.txt") == ""
    assert git(repo, "rev-parse", "feature-login") != git(repo, "rev-parse", "feature-rebase")
    assert git(repo, "rev-list", "--count", "start..compare-rebase") == "3"

    execute("不想被追蹤的檔案/README.md", root)
    repo = root / "ignore-demo"
    content(repo, "local.config", "theme=dark\n")
    assert "local.config" not in git(repo, "ls-files").splitlines()
    assert git(repo, "check-ignore", "local.config") == "local.config"
    clean(repo)

    execute("worktree/README.md", root, end="## 6. 常用指令")
    repo = root / "worktree-demo"
    clean(repo)
    assert git(repo, "branch", "--show-current") == "main"
    assert len(git(repo, "worktree", "list", "--porcelain").split("worktree ")) == 2
    content(repo, "index.txt", "Home title\n")
    content(repo, "about.txt", "About our team\n")
    content(repo, "login.txt", "Login form: still working\nLogin form: add password field\n")

    execute("日常工作流程/README.md", root, start="## 4. 照做", end="## 5. 修改")
    repo = root / "ai-git-demo"
    clean(repo)
    content(repo, "search.txt", "Search: ready\nHint: enter a keyword\n")
    assert git(repo, "branch", "--show-current") == "main"

    execute("回復被刪除的檔案或被編輯的內容/README.md", root, end="## 6. 自己做")
    repo = root / "restore-demo"
    clean(repo)
    content(repo, "note.txt", "Version 1\n")
    assert not (repo / "scratch.txt").exists()
    assert "Revert" in git(repo, "log", "-1", "--format=%s")

    execute("git_reset/README.md", root, end="## 6. 已移走")
    repo = root / "reset-demo"
    clean(repo)
    content(repo, "version.txt", "V3\n")
    assert git(repo, "rev-list", "--count", "HEAD") == "3"

    execute("修改目前commit/README.md", root, end="## 5. 換你做")
    repo = root / "amend-demo"
    clean(repo)
    assert git(repo, "rev-list", "--count", "HEAD") == "4"
    assert {"about.txt", "contact.txt"}.issubset(set(git(repo, "show", "--format=", "--name-only", "HEAD~1").splitlines()))

    # Drive the actual interactive-rebase blocks with the exact lesson choices.
    rb = blocks("git_rebase/README.md", end="## 5. 卡關")
    assert len(rb) == 7
    run(rb[0], root, "rebase：準備起點")
    repo = root / "rebase-demo"
    sequence_editor = root / "sequence-editor.py"
    sequence_editor.write_text('''#!/usr/bin/env python3
import os, pathlib, sys
p = pathlib.Path(sys.argv[1])
lines = p.read_text().splitlines(keepends=True)
stage = os.environ["LESSON_REBASE_STAGE"]
indices = [i for i, line in enumerate(lines) if line.startswith("pick ")]
if stage == "reword":
    for i in indices:
        lines[i] = lines[i].replace("pick ", "reword ", 1)
elif stage == "squash":
    for i in indices[1:]:
        lines[i] = lines[i].replace("pick ", "squash ", 1)
elif stage == "edit":
    assert len(indices) == 1
    lines[indices[0]] = lines[indices[0]].replace("pick ", "edit ", 1)
p.write_text("".join(lines))
''', encoding="utf-8")
    message_editor = root / "message-editor.py"
    message_editor.write_text('''#!/usr/bin/env python3
import os, pathlib, sys
p = pathlib.Path(sys.argv[1])
message = p.read_text()
if os.environ["LESSON_REBASE_STAGE"] == "squash":
    p.write_text("新增三個練習頁面\\n")
else:
    for name in ("f4", "f5", "f6"):
        message = message.replace("新增 " + name + "\\n", "新增 " + name + ".html\\n", 1)
    p.write_text(message)
''', encoding="utf-8")
    sequence_editor.chmod(0o755)
    message_editor.chmod(0o755)
    for stage, command, checks in (("reword", rb[1], rb[2]), ("squash", rb[3], rb[4]), ("edit", rb[5], rb[6])):
        env = dict(ENV, LESSON_REBASE_STAGE=stage, GIT_SEQUENCE_EDITOR=str(sequence_editor), GIT_EDITOR=str(message_editor))
        run(command + "\n" + checks, repo, f"rebase：{stage}", env)
        assert git(repo, "diff", "before-rebase", "HEAD") == ""
        clean(repo)
        expected_count = {"reword": "4", "squash": "2", "edit": "3"}[stage]
        assert git(repo, "rev-list", "--count", "HEAD") == expected_count
    assert git(repo, "log", "-1", "--format=%s") == "新增 f5.html 與 f6.html"

    execute("tag/README.md", root, end="## 3. 分享")
    repo = root / "tag-demo"
    clean(repo)
    assert git(repo, "show", "v1.0:version.txt") == "Release 1"
    assert git(repo, "branch", "--show-current") == "main"

    execute("檢查先前修改的檔案/README.md", root, end="## 4. 想從舊版本")
    repo = root / "history-view-demo"
    clean(repo)
    assert git(repo, "branch", "--show-current") == "main"
    assert all((repo / f"{name}.txt").exists() for name in "abc")

    # Use a local bare remote to check the written Git commands; GitHub's
    # web-based PR creation, permissions, and review still require a real site.
    remote = root / "shared.git"
    q = lambda path: shlex.quote(str(path))
    run(f"git init --bare --initial-branch=main {q(remote)}", root, "建立模擬遠端")
    seed = root / "seed"
    seed.mkdir()
    run("git init -b main\nprintf '# Class\\n' > README.md\ngit add README.md\n"
        "git commit -m '建立遠端起點'\n" + f"git remote add origin {q(remote)}\ngit push -u origin main",
        seed, "準備遠端 main")
    actors = [root / "student-a", root / "student-b"]
    for actor in actors:
        actor.mkdir()
    collaboration = blocks("協作與PullRequest/README.md", start="## 3. 兩人實作", end="## 4. 沒有寫入權限")
    assert len(collaboration) == 5
    clone = collaboration[0].replace("https://github.com/OWNER/class-team-demo.git", q(remote) + " class-team-demo")
    for actor in actors:
        run(clone, actor, f"共同開發：{actor.name} clone")
    a, b = (actor / "class-team-demo" for actor in actors)
    run(collaboration[1] + "\n" + collaboration[2], a, "共同開發：A push")
    run(collaboration[3], b, "共同開發：B push")
    reviewer = root / "reviewer"
    run(f"git clone {q(remote)} {q(reviewer)}\ncd {q(reviewer)}\n"
        "git merge --no-edit origin/docs-course\ngit merge --no-edit origin/docs-members\ngit push origin main",
        root, "模擬審查後合併兩個分支")
    for actor in (a, b):
        run(collaboration[4], actor, f"共同開發：{actor.parent.name} 更新 main")
        clean(actor)
        assert (actor / "course.md").exists() and (actor / "members.md").exists()

    # Two bare remotes represent the teacher's repo and the student's fork.
    teacher, fork = root / "teacher.git", root / "fork.git"
    run(f"git clone --bare {q(remote)} {q(teacher)}\ngit clone --bare {q(teacher)} {q(fork)}",
        root, "準備老師與學生的模擬遠端")
    learner = root / "learner"
    learner.mkdir()
    fork_blocks = blocks("Fork交作業/README.md")
    assert len(fork_blocks) == 4
    first = ("\n".join(fork_blocks[:3]).replace("https://github.com/YOUR_ACCOUNT/class-homework.git", q(fork) + " class-homework")
             .replace("https://github.com/TEACHER_ACCOUNT/class-homework.git", q(teacher))
             .replace("YOUR_ACCOUNT", "student-a"))
    run(first, learner, "Fork：clone、提交與 push")
    learner_b = root / "learner-b"
    learner_b.mkdir()
    fork_b = root / "fork-b.git"
    run(f"git clone --bare {q(teacher)} {q(fork_b)}", root, "準備第二位學生 Fork")
    second = first.replace(q(fork), q(fork_b)).replace("student-a", "student-b")
    run(second, learner_b, "Fork：第二位學生使用個人路徑提交")
    teacher_admin = root / "teacher-admin"
    run(f"git clone {q(teacher)} {q(teacher_admin)}\ncd {q(teacher_admin)}\n"
        + f"git fetch {q(fork)} homework-intro\ngit merge --no-edit FETCH_HEAD\n"
        + f"git fetch {q(fork_b)} homework-intro\ngit merge --no-edit FETCH_HEAD\ngit push origin main",
        root, "模擬老師合併 Fork 的 PR")
    learner_repo = learner / "class-homework"
    run(fork_blocks[3], learner_repo, "Fork：合併後同步")
    clean(learner_repo)
    assert (learner_repo / "homework/student-a/introduction.md").exists()
    assert (learner_repo / "homework/student-b/introduction.md").exists()
    assert git(learner_repo, "rev-parse", "main") == git(learner_repo, "rev-parse", "upstream/main")
    assert git(learner_repo, "rev-parse", "main") == git(learner_repo, "rev-parse", "origin/main")

    print("\nAll local sequential exercises and final-state checks passed.")
    print("GitHub's website, authentication and actual PR permissions require separate online checks.")
