## 1.安装JDK17

###### 可以去[Temurin](https://adoptium.net/?variant=openjdk17&jvmVariant=hotspot)或[Oracle JDK](https://www.oracle.com/java/technologies/downloads/#java17)上下载(后者下载需注册登录)。

###### 可以在命令行中输入 javac -version（请注意是 javac，不是 java）来查看你当前安装的 JDK 版本。

## 2.安装Android Studio

###### #### 1. 安装 Android Studio

[首先下载和安装 Android Studio](https://developer.android.google.cn/studio/)，国内用户可能无法打开官方链接，请自行使用搜索引擎搜索可用的下载链接。安装界面中选择"Custom"选项，确保选中了以下几项：

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

然后点击"Next"来安装选中的组件。

> 如果选择框是灰的，你也可以先跳过，稍后再来安装这些组件。

安装完成后，看到欢迎界面时，就可以进行下面的操作了。

#### 2. ### Android 开发环境

Android Studio 默认会安装最新版本的 Android SDK。目前编译应用需要的是`Android 14 (UpsideDownCake)`版本的 SDK。你可以在 Android Studio 的 SDK Manager 中选择安装各版本的 SDK。

> SDK Manager 可以在 Android Studio 的"Preferences"菜单中找到。具体路径是**Appearance & Behavior** → **System Settings** → **Android SDK**。

在 SDK Manager 中选择"SDK Platforms"选项卡，然后在右下角勾选"Show Package Details"。展开`Android 14 (UpsideDownCake)`选项，确保勾选了下面这些组件（如果你看不到这个界面，则需要使用稳定的代理软件）：

- `Android SDK Platform 34`
- `Intel x86 Atom_64 System Image`（官方模拟器镜像文件，使用非官方模拟器不需要安装此组件）

然后点击"SDK Tools"选项卡，同样勾中右下角的"Show Package Details"。展开"Android SDK Build-Tools"选项，确保选中了 必须的`34.0.0`版本。

最后点击"Apply"来下载和安装这些组件。

![](https://i.imgur.com/dJHEqOF.png)

#### 3. 配置 ANDROID_HOME 环境变量

 需要通过环境变量来了解你的 Android SDK 装在什么路径，从而正常进行编译。

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` -> `高级` -> `环境变量` -> `新建`，创建一个名为`ANDROID_HOME`的环境变量（系统或用户变量均可），指向你的 Android SDK 所在的目录（具体的路径可能和下图不一致，请自行确认）：

![](https://i.imgur.com/V4x2BIv.png)

SDK 默认是安装在下面的目录：

powershell

```
C:\Users\你的用户名\AppData\Local\Android\Sdk
```

你可以在 Android Studio 的"Preferences"菜单中查看 SDK 的真实路径，具体是**Appearance & Behavior** → **System Settings** → **Android SDK**。

你需要关闭现有的命令符提示窗口然后重新打开，这样新的环境变量才能生效。

#### 4. 把工具目录添加到环境变量 Path

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` -> `高级` -> `环境变量`，选中**Path**变量，然后点击**编辑**。点击**新建**然后把以下工具目录路径添加进去：platform-tools

powershell

```
%ANDROID_HOME%\platform-tools
```
