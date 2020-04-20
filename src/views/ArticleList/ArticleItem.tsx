import React, { useMemo } from 'react'
import { Divider } from 'antd'
import classnames from 'classnames'

import { markdownToHtml } from '@utils/index'
import styles from './index.scss'
import ArticleTags from '@components/ArticleTags'
import Icon from '@components/Icon'
import { useTagStore } from '@store/index'
import { getTagColor, getWindowWidth } from '@utils/index'

export interface ReplyItem extends CommentItem {}

interface User {
  id: number
  username: string
}

export interface CommentItem {
  content: string
  createdAt: string
  id: number
  user?: User
  replies: ReplyItem[]
  replyUser?: User
  targetUsername?: string
}

export interface ArticleItem {
  content: string
  title: string
  id: number
  tags: ITagStore.TagItem[]
  createdAt: string
  updatedAt: string
  viewCount: number
  comments: CommentItem[]
}

interface IProps {
  data: ArticleItem
  getTargetArticleId: (id: number) => void
}

const ArticleItem = ({ data, getTargetArticleId }: IProps) => {
  const { title, content, id, tags, comments } = data

  const windowWidth = getWindowWidth()

  const {
    state: { tagList }
  } = useTagStore()

  const tempTagList = getTagColor(tagList, tags)

  const discussCount = useMemo(() => {
    let count = comments.length
    comments.forEach(item => {
      count = count + item.replies.length
    })
    return count
  }, [comments])

  return (
    <div className={styles.articleItem}>
      {windowWidth > 768 ? (
        <Divider orientation="left">
          <span onClick={() => getTargetArticleId(id)} className={styles.title}>
            {title}
          </span>
          <span className={styles.createTime}>{data.createdAt}</span>
        </Divider>
      ) : (
        <div className={styles.mobileTitleWrapper}>
          <div onClick={() => getTargetArticleId(id)} className={styles.title}>
            {title}
          </div>
          <div className={styles.createTime}>{data.createdAt}</div>
        </div>
      )}

      <div
        className={classnames(styles.description, styles.markdown)}
        dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
        onClick={() => getTargetArticleId(id)}
      />
      <div className={styles.otherInfo}>
        <div className={styles.viewCountAndDicuss}>
          <div className={styles.item}>
            <Icon
              className={styles.icon}
              width={16}
              height={16}
              color="#828a8c"
              id="discuss2e"
            />
            {discussCount}
          </div>
          <div className={styles.item}>
            <Icon
              className={styles.icon}
              width={20}
              height={20}
              color="#828a8c"
              id="yanjing"
            />
            {data.viewCount}
          </div>
        </div>
        {!!tags.length && windowWidth > 768 && (
          <>
            <Divider type="vertical" />
            <div className={styles.tagContainer}>
              <Icon
                width={16}
                height={16}
                className={styles.tagIcon}
                color="#838a8c"
                id="tags"
              />
              <ArticleTags tags={tempTagList} />
            </div>
          </>
        )}
      </div>
      {windowWidth <= 768 && (
        <ArticleTags className={styles.mobildTags} tags={tempTagList} />
      )}
    </div>
  )
}

export default ArticleItem
