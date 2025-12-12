This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# react-native0.82版本列表快速滑动保持UI帧率60FPS

![](https://img.feria.eu.org/dkvj6k.gif)

## Tips 1: 引入FlashList

替换FlatList为**FlahsList**，在该项目100条帖子数据的测试中，FlashList表现明显优于FlatList，FlashList采用的是**缓存池重用Cell**的技术，不同于FlatList的mount和unmount，不需要重新创建组件，而是重用缓存池的Cell，**采用新的数据源将页面更新**。

```sh
# using Yarn
yarn add @shopify/flash-list
```

## Tips 2: 引入babel-plugin-react-compiler

React组件重渲染机制中，父组件重渲染会导致**所有子组件重渲染**，之前要花很多精力来使用useMemo、useCallback、React.memo来优化不需要刷新的组件。现在引入react-compiler就可以很好的达到这个目的

```sh
# using Yarn
yarn add -D babel-plugin-react-compiler@latest
```

### Tips 3: 引入react-native-fast-image

不同于react-native提供的Image组件，FastImage原生层都是各个平台的老牌图片加载库( **[SDWebImage (iOS)](https://github.com/rs/SDWebImage)** and **[Glide (Android)](https://github.com/bumptech/glide)**)，**胜在内存的占用上**，该项目的100条帖子数据的测试中，FastImage占用RAM为235M，Image占用RAM为292M

```sh
# using Yarn
yarn add @d11/react-native-fast-image
```

### Tips 4: 引入zustand作为状态管理库

列表项的操作按钮例如点赞功能，常规hooks的写法需要**结合props和state**。可以使用zustand作为状态管理，**维护所有帖子的状态表，通过帖子id取出状态**。减少**心智负担和代码量**，而且可以减少不必要的重复渲染。

```sh
# using Yarn
yarn add zustand
```
