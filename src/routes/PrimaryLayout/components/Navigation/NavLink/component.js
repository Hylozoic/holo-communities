import React from 'react'
import { Link } from 'react-router'
import Icon from 'components/Icon'
import Badge from 'components/Badge'
import cx from 'classnames'

export default function NavLink (
  { to, label, icon, badge, indexOnly = false }, { router, collapsed }
) {
  const active = router.isActive(to, indexOnly)

  return <li styleName={cx('item', {active})}>
    <Link to={to} styleName={cx('link', {collapsed})}>
      <Icon name={icon} green={active} styleName='icon' />
      {label}
      {badge && <Badge number={badge} expanded={badge % 2 === 0} styleName='badge' />}
    </Link>
  </li>
}
NavLink.contextTypes = {
  router: React.PropTypes.object,
  collapsed: React.PropTypes.bool
}
