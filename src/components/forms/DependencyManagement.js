import React from 'react'
import Select from 'react-select'

import DependencyItem from './DependencyItem'

const DependencyManagement = ({
  fields,
  appDependenciesInfo,
  onSearchKintoBlocks,
  fetchKintoBlockDependenciesData
}) => {
  const onSelectKintoBlock = selectedItem => {
    fetchKintoBlockDependenciesData(
      selectedItem.id,
      selectedItem.version
    ).then(data => {
      setTimeout(() => {
        fields.push(data)
      })
    })
  }

  return (
    <div className="form-body">
      <Select.Async
        placeholder="Search KintoBlocks or services"
        loadOptions={onSearchKintoBlocks}
        onChange={onSelectKintoBlock}
      />

      {fields.length ? (
        <div className="blocks-or-services">
          {fields.map((field, key, fields) => (
            <DependencyItem
              key={key}
              index={key}
              field={field}
              fields={fields}
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
