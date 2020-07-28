## Git 用法笔记
### 安装Git
+ windows 系统从官网下载，安装完成后设置用户名和邮箱
  - `git config --global user.name "Your Name"` ： 设置用户名
  - `git config --global user.email "email@example.com"` ： 设置邮箱

  *注意*: git config命令的--global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。


### 创建版本库
+ mkdir 目录名：创建一个目录
+ pwd：显示当前目录
+ git init : 初始化 git 仓库，将某个目录变成 Git 可以管理的仓库

*注意*：千万不要使用Windows自带的记事本编辑任何文本文件，原因是Microsoft开发记事本的团队自作聪明地在每个文件开头添加了0xefbbbf（十六进制）的字符，会遇到很多不可思议的问题。

### 将文件放到 git 仓库
+ git add <file> : 把文件添加到 git 仓库
+ git commit -m 'xxx'：把文件提交到 git 仓库
+ git status ：查看 git 仓库当前的状态，能够看到那些文件被改动或新增了。
+ git diff <file>：查看文件的具体改动内容
+ cat <file>：产看文件内容
+ vim <file>: 编辑文件
  - i : 插入，然后 esc 退出，:q 退出，:wq 报错修改并退出

+ 为什么Git添加文件需要add，commit一共两步呢？
  - 因为commit可以一次提交很多文件，所以你可以多次add不同的文件，比如：
  `git add file1.txt`
  `git add file2.txt file3.txt`
  `git commit -m "add 3 files."`


### 版本回退
+ git log：显示从最近到最远的提交日志
+ 在 git 中， 用 `HEAD` 表示当前版本，上一个版本是 `HEAD^`，上上个版本是 `HEAD^^`，当然往上100个版本写100个^比较容易数不过来，所以写成`HEAD~100`
+ 回退版本：`git reset --hard HEAD^`：回退到上个版本，代码会回到上一次 commit 的状态。也可以通过 `git reset --hard commit的id` 回退到指定的 commit id 的提交
+ git reflog：记录你的每一次命令


### 工作区和暂存区
+ 工作区：就是在电脑里能看到的目录，比如learnGit文件夹就是一个工作区

+ 版本库：工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。
  - Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。

+ git add把文件添加进去，实际上就是把文件修改添加到*暂存区*；
+ git commit提交更改，实际上就是把暂存区的所有内容提交到*当前分支*。创建Git版本库时，Git自动为我们创建了唯一一个master分支，所以，现在，git commit就是往master分支上提交更改。


### 管理修改
+ git diff HEAD -- <file>：可以查看工作区和版本库里面最新版本的区别：


### 撤销修改
+ git checkout -- <file>：把文件在*工作区*的修改全部撤销，这里有两种情况：
  - 一种是文件自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态
  - 一种是文件已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
+ git reset HEAD <file> ：可以把*暂存区*的修改撤销掉（unstage），重新放回工作区：
+ 如果已经把暂存区的提交到了版本库，可以通过版本回退到上一个版本


### 删除文件
+ git rm <file>：从版本库中删除该文件
  - 小提示：先手动删除文件，然后使用git rm <file>和git add<file>效果是一样的。


### 远程仓库
+ git remote add origin 远程仓库：把本地仓库和远程仓库关联
+ git push -u origin master：把本地库的所有内容推送到远程库上
  - -u：把本地的master分支和远程的master分支关联起来


### 分支管理
+ git checkout -b dev：本地仓库创建 dev 分支并切换到该分支
+ git checkout <branchName>：切换分支
+ git branch：查看本地所以分支
  - git branch -a：查看所有分支（本地、远程）
+ git merge <branchName>：合并指定分支到当前分支
+ git branch -d <branchName>：删除指定分支


### 解决冲突
+ 如果两个分支都对一个文件做了改动，并且提交到本地仓库，当一个分支合并到另一个分支时会产生冲突，可以通过修改一个分支的文件，然后再次提交，此时HEAD 指向当前提交的分支
+ git log --graph 查看合并分支图


### 分支管理策略
+ 通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。
  - 如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
+ git merge --no-ff -m '信息' dev：禁用 Fast Forward 合并dev 分支到 master 分支
  - --no-ff：表示禁用Fast forward

+ 分支策略：
  - master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活
  - dev 分支用来开发，当开发完成后再合并到 master 分支上，每个人都在dev分支上干活，都有对应的分支，往dev分支上合并

### Bug 分支
+ git stash：当出现bug时，使用这个命令把当前工作现场“储藏”起来，再创建一个bug 分支修复bug后合并到master分支，等以后恢复现场后继续工作：
+ git stash list：查看之前存储的工作现场
+ git stash apply：恢复工作现场
+ git stash drop：删除之前存储的工作现场
+ git stash apply stash@{0}：恢复指定的工作现场

+ git cherry-pick：能复制一个特定的提交到当前分支


### Feature 分支
+ feature 分支用于开发新功能，然后合并到master分支
+ git branch -D <name>：强行删除一个没有被合并过的分支


### 多人协作
+ git remote：产看远程仓库信息
  - git remote -v ：显示更详细的信息

+ 推送分支：git push origin master：将本地的 master 分支推送到远程仓库
  - 并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？
    1. master分支是主分支，因此要时刻与远程同步；
    2. dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
    3. bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
    4. feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。
  
+ 抓取远程分支：
  - git checkout -b dev origin/dev : 本地创建 dev 分支并与远程 dev 分支关联
  - git pull：把最新的提交从远程抓下来
  - git branch --set-upstream-to=origin/dev dev：设置本地 dev 分支和远程 dev 分支关联


### tag 的使用
  - 写完一部分代码后：git add . , git commit , git tag xxx
  - 查看tag： git tag
  - 查看提交历史：git log
  - 切换tag：git checkout tag名称
  - 回退到初始状态：git reset --hard 提交的哈希值
  - 向远程仓库 push tag：git push --tags