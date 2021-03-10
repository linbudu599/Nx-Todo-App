import { EntityMetadataMap } from '@ngrx/data';

// 实体-实体元数据映射
// 元数据包含主键 实体名
// 过滤函数
// 比较函数
// dispatch相关(乐观更新)
// 额外状态
const entityMetadata: EntityMetadataMap = {
  Hero: {
    entityDispatcherOptions: { optimisticAdd: true, optimisticUpdate: true },
    additionalCollectionState: { name: '林不渡' },
  },
  Villain: {},
};

// because the plural of "hero" is not "heros"
const pluralNames = { Hero: 'Heroes' };

export const entityConfig = {
  entityMetadata,
  pluralNames,
};
