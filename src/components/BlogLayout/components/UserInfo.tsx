import React, { useState } from 'react'
import { Button, Dropdown, Avatar, Menu } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'
import AuthModal from './AuthModal'
import { useUserStore } from '@store/index'

export type AuthModalType = 'login' | 'register'

const MenuItem = Menu.Item

const UserInfo = ({ history }: RouteComponentProps) => {
  const [authVisible, setAuthVisible] = useState<boolean>(false)
  const [authModalType, setAuthModalType] = useState<AuthModalType>('login') // 探矿类型

  const {
    state: { userInfo },
    dispatch
  } = useUserStore()

  // 设置模态框状态
  const triggerAuthModal = (visible: boolean, type?: AuthModalType) => {
    setAuthVisible(visible)
    setAuthModalType(type)
  }

  // 退出登录
  const logout = () => {
    dispatch({ type: 'USER_LOGIN_OUT' })
  }

  // 去admin页面
  const gotoAdmin = () => {
    history.push('/admin')
  }

  const renderMenu = () => {
    return (
      <Menu>
        {userInfo.auth === 2 && (
          <MenuItem onClick={gotoAdmin}>管理中心</MenuItem>
        )}
        <MenuItem onClick={logout}>退出登录</MenuItem>
      </Menu>
    )
  }

  return (
    <div className={styles.headerUserInfo}>
      {!!userInfo ? (
        <Dropdown
          trigger={['click']}
          placement="bottomCenter"
          overlay={renderMenu()}
        >
          <Avatar className={styles.headerAvatar} size="large">
            {userInfo.username}
          </Avatar>
        </Dropdown>
      ) : (
        <>
          <Button
            onClick={() => triggerAuthModal(true, 'login')}
            ghost
            type="primary"
            size="small"
            style={{ marginRight: 20 }}
          >
            登录
          </Button>
          <Button
            onClick={() => triggerAuthModal(true, 'register')}
            ghost
            type="danger"
            size="small"
          >
            注册
          </Button>
        </>
      )}
      <AuthModal
        triggerAuthModal={triggerAuthModal}
        closeModal={() => setAuthVisible(false)}
        authModalType={authModalType}
        visible={authVisible}
      />
    </div>
  )
}

export default withRouter(UserInfo)
