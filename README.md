This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# react-native0.82版本列表快速滑动保持UI帧率60FPS

效果实例图，在模拟器并且是Dev模式下运行的，Release模式效果会更优。

![](https://github.com/weiningtry7/RNNewArch/blob/master/dkvj6k.gif?raw=true)



## Tips : 擅长使用性能分析工具

工欲善其事必先利其器，新架构**DevTools**中的**Profiler**可以记录到组件**why did this render**这样就可以根据渲染的原因来对**JS 帧率**进行优化。Android Studio中的**Profiler**可以记录跨越了帧边界线程，定位问题**出在 JS 中**还是**出在正在渲染的原生视图中**。这样才能做到事半功倍。

![](https://github.com/weiningtry7/RNNewArch/blob/master/Profiler.png)

## Tips : 引入FlashList或者legend-list

替换FlatList为**FlahsList**，在该项目100条帖子数据的测试中，FlashList表现明显优于FlatList，FlashList采用的是**缓存池重用Cell**的技术，不同于FlatList的mount和unmount，不需要重新创建组件，而是重用缓存池的Cell，**采用新的数据源将页面更新**。

```sh
# using Yarn
yarn add @shopify/flash-list
```

## Tips : 引入babel-plugin-react-compiler

React组件重渲染机制中，父组件重渲染会导致**所有子组件重渲染**，之前要花很多精力来使用useMemo、useCallback、React.memo来优化不需要刷新的组件。现在引入react-compiler就可以很好的达到这个目的

```sh
# using Yarn
yarn add -D babel-plugin-react-compiler@latest
```

## Tips : 引入react-native-fast-image

不同于react-native提供的Image组件，FastImage原生层都是各个平台的老牌图片加载库( **[SDWebImage (iOS)](https://github.com/rs/SDWebImage)** and **[Glide (Android)](https://github.com/bumptech/glide)**)，**胜在内存的占用上**，该项目的100条帖子数据的测试中，FastImage占用RAM为235M，Image占用RAM为292M

```sh
# using Yarn
yarn add @d11/react-native-fast-image
```

## Tips : 引入zustand作为状态管理库

列表项的操作按钮例如点赞功能，常规hooks的写法需要**结合props和state**。可以使用zustand作为状态管理，**维护所有帖子的状态表，通过帖子id取出状态**，让点赞按钮的组件**只订阅点赞那一层的数据**，减少不必要的重复渲染，减少**心智负担和代码量**。

```sh
# using Yarn
yarn add zustand### 
```
