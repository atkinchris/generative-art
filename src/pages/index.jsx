/* eslint-disable global-require, import/no-dynamic-require */
import React from 'react'
import { Link } from 'gatsby'

const pages = [
  { name: 'georg-nees', title: 'Georg Nees' },
  { name: 'circle-packing', title: 'Circle Packing' },
  { name: 'watercolour', title: 'Watercolour' },
  { name: 'triangle-subdivision', title: 'Triangle Subdivision' },
  { name: 'clock-of-clocks', title: 'Clock of Clocks' },
  { name: 'flow-field', title: 'Perlin Flow Field' },
  { name: 'text-pathing', title: 'Text Pathing' },
]

const IndexPage = () => (
  <div className="c-container">
    <div className="c-grid">
      {pages.map(({ name, title }) => (
        <div className="c-grid__item" key={title}>
          <Link to={`/${name}`} className="c-card">
            <img className="c-thumbnail" src={require(`/${name}/thumbnail.png`)} alt={`Thumbnail for ${title}`} />
            {title}
          </Link>
        </div>
      ))}
    </div>
  </div>
)

export default IndexPage
