import React from 'react'
import DependencyItem from './DependencyItem'

const DependencyManagement = ({ fields, appDependenciesInfo }) => {
  return (
    <div className="form-body">
      <input type="search" placeholder="Search KintoBlocks or services" />

      {fields.length ? (
        <div className="blocks-or-services">
          {fields.map((field, key, fields) => (
            <DependencyItem
              key={key}
              field={field}
              appDependenciesInfo={appDependenciesInfo}
              data={fields.get(key)}
            />
          ))}
        </div>
      ) : (
        <div className="no-blocks-or-services">
          <div className="icons">
            <div className="kinto-block" />
            <div className="service" />
          </div>
          <div className="text">No KintoBlocks or services added</div>
        </div>
      )}
      {/*
        <div className="combine-buttons">
          <Button buttonType="secondary" image="/images/icon-split-glyph.svg">
            Split All Duplicate Instances
          </Button>
          <Button buttonType="secondary" image="/images/icon-combine-glyph.svg">
            Combine All Duplicate Instances
          </Button>
        </div>
      */}
    </div>
  )
}

export default DependencyManagement
