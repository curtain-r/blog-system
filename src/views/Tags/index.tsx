import React from 'react'
import { Tag, Badge } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import PageLoading from '@components/PageLoading'
import styles from './index.scss'
import { useTagStore } from '@store/index'

const Tags = ({ history }: RouteComponentProps) => {
  const {
    state: { tagList, isGetTagList }
  } = useTagStore()

  // 跳转到相对于该标签的文章列表页
  const showTagWithArticle = (tag: ITagStore.TagItem) => {
    history.push(`/tag/${tag.value}`)
  }
  return (
    <div className={styles.tagPage}>
      {isGetTagList ? (
        <div className={styles.tagsWrapper}>
          <div className={styles.header}>
            <div className={styles.title}>Tags</div>
            <div className={styles.info}>当前一共有{tagList.length}个标签</div>
          </div>
          <div className={styles.tagsWrapper}>
            {tagList.map(tag => (
              <Badge className={styles.badge} count={tag.count} key={tag.id}>
                <Tag
                  onClick={() => showTagWithArticle(tag)}
                  className={styles.tagItem}
                  color={tag.color}
                >
                  {tag.value}
                </Tag>
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <PageLoading />
      )}
    </div>
  )
}

export default withRouter(Tags)
