import React from 'react'
import { isEmpty } from 'lodash'
import { bgImageStyle } from 'util/index'
import './PostImage.scss'

const PostImage = ({ imageUrl, otherImageUrls, className, linked }) => {
  if (!imageUrl) return null
  return <div style={bgImageStyle(imageUrl)} className={className}>
    <div>
      {linked && <a href={imageUrl} target='_blank' styleName='link'>&nbsp;</a>}
      <div styleName='others'>
        <div styleName='others-inner'>
          {!isEmpty(otherImageUrls) && otherImageUrls.map(url =>
            <a href={url} key={url} target='_blank' styleName='other'>
              <div style={bgImageStyle(url)} />
            </a>)}
        </div>
      </div>
    </div>
  </div>
}

export default PostImage
