import React, { useEffect, useState } from 'react'
import { Pagination, Empty, Icon, Drawer } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'
import PageLoading from '@components/PageLoading'
import Article, { ArticleItem } from './ArticleItem'
import ListPreview from './ListPreview'
import { decodeQuery, getWindowWidth } from '@utils/index'
import { useGetListData } from '@utils/hooks'
import { getArticleList } from '@services/api'

interface SearchQuery {
  page: number
  keyword?: string
}

const pageSize = 10

const ArticleList = ({ history, location }: RouteComponentProps) => {
  const [params, setParams] = useState<FetchParams.GetArticleList>(null)
  const [cancelRequire, setCancelRequire] = useState<boolean>(true)

  // 移动端抽屉展示
  // eslint-disable-next-line prettier/prettier
  const [isShowTitleListDrawer, setIsShowTitleListDrawer] = useState<boolean>(false)

  const windowWidth = getWindowWidth()

  const { list, loading, total } = useGetListData<
    ArticleItem,
    FetchParams.GetArticleList
  >(getArticleList, params, cancelRequire)

  const getList = async (page: number, keyword?: string) => {
    const data = {
      page,
      pageSize,
      keyword,
      isContentLimit: true
    }
    setCancelRequire(false)
    setParams(data)
  }

  // 跳转文章详情
  const getTargetArticleId = (id: number) => {
    history.push(`/article-detail/${id}`)
    setIsShowTitleListDrawer(false)
  }

  // 改变页码
  const changePage = (p: number) => {
    const urlParams = decodeQuery(location.search)
    const params: PlainObj & SearchQuery = !!location.search
      ? { ...urlParams, page: p }
      : { page: p }
    let url: string
    Object.keys(params).forEach(key => {
      url = !url ? `?${key}=${params[key]}` : `${url}&${key}=${params[key]}`
    })
    history.push(url)
  }

  useEffect(() => {
    const { page, keyword } = decodeQuery(location.search)
    getList(!!page ? page : 1, keyword)
  }, [location.search])

  const { page, keyword } = decodeQuery(location.search)

  return (
    <div className={styles.article}>
      <div className={styles.articleListWrapper}>
        {loading ? (
          <PageLoading />
        ) : (
          <>
            {!!list.length ? (
              <div className={styles.articleListContainer}>
                <div className={styles.articleList}>
                  {list.map(item => (
                    <Article
                      getTargetArticleId={getTargetArticleId}
                      key={item.id}
                      data={item}
                    />
                  ))}
                </div>
                <ListPreview
                  getTargetArticleId={getTargetArticleId}
                  list={list}
                />
              </div>
            ) : (
              <Empty
                description={
                  !!keyword
                    ? `未找到标题含有 ${keyword} 的文章`
                    : '暂时还没有文章呢'
                }
                className={styles.empty}
              />
            )}
          </>
        )}
      </div>
      {!!list.length && (
        <div className={styles.pagination}>
          <Pagination
            pageSize={pageSize}
            onChange={changePage}
            total={total}
            current={!!page ? Number(page) : 1}
          />
        </div>
      )}
      {windowWidth <= 576 && (
        <>
          <div
            onClick={() => setIsShowTitleListDrawer(true)}
            className={styles.mobileDrawerBtn}
          >
            <Icon type="menu-o" />
          </div>
          <Drawer
            className={styles.mobileDrawer}
            closable={false}
            title="文章列表"
            onClose={() => setIsShowTitleListDrawer(false)}
            visible={isShowTitleListDrawer}
          >
            {list.map(item => (
              <div
                onClick={() => getTargetArticleId(item.id)}
                className={styles.mobileArticleTitle}
                key={item.id}
              >
                {item.title}
              </div>
            ))}
          </Drawer>
        </>
      )}
    </div>
  )
}

export default withRouter(ArticleList)
