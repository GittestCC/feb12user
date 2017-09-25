import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Button, CheckBox } from '../../../forms'
import { required } from '../../../../helpers/validators'

const KintoAppCreateForm = ({ handleSubmit }) => {
  const addedBlocksServices = [
    {
      id: '1',
      version: '1.0.0',
      name: 'Kintoblock1',
      description:
        'Some random description text here. My biggest deepest darkest secret is… of course I’m not telling you here',
      type: 'kintoblock',
      dependencies: [
        {
          name: 'kinto-1',
          description: 'some text',
          type: 'kintoblock'
        },
        {
          name: 'kinto-1',
          description: 'some text',
          type: 'kintoblock'
        },
        {
          name: 'kinto-1',
          description: 'some text',
          type: 'kintoblock'
        },
        {
          name: 'kinto-1',
          description: 'some text',
          type: 'kintoblock'
        },
        {
          name: 'kinto-1',
          description: 'some text',
          type: 'kintoblock'
        },
        {
          name: 'kinto-2',
          description: 'some text',
          type: 'kintoblock'
        }
      ]
    },
    {
      id: '1',
      version: '1.0.0',
      name: 'Kintoblock1',
      description:
        'Some random description text here. My biggest deepest darkest secret is… of course I’m not telling you here',
      type: 'kintoblock',
      dependencies: []
    },
    {
      id: '1',
      version: '1.0.0',
      name: 'Service1',
      description:
        'Some random description text here. My biggest deepest darkest secret is… of course I’m not telling you here',
      type: 'service',
      dependencies: [
        {
          name: 'kinto-1',
          description:
            'Some random description text here. My biggest deepest darkest secret is…',
          type: 'kintoblock'
        },
        {
          name: 'kinto-2',
          description: 'of course I’m not telling you here',
          type: 'kintoblock'
        },
        {
          name: 'service-2',
          description:
            'Some random description text here. My biggest deepest darkest secret is…',
          type: 'service'
        },
        {
          name: 'service-2',
          description: 'of course I’m not telling you here',
          type: 'service'
        },
        {
          name: 'kinto-2',
          description:
            'Some random description text here. My biggest deepest darkest secret is…',
          type: 'kintoblock'
        },
        {
          name: 'service-2',
          description: 'of course I’m not telling you here',
          type: 'service'
        }
      ]
    },
    {
      id: '1',
      version: '1.0.0',
      name: 'Kintoblock2',
      description:
        'Some random description text here. My biggest deepest darkest secret is… of course I’m not telling you here',
      type: 'kintoblock',
      dependencies: [
        {
          name: 'kinto-1',
          description: 'of course I’m not telling you here',
          type: 'kintoblock'
        },
        {
          name: 'kinto-2',
          description:
            'Super long description some random description text here. My biggest deepest darkest secret issome random description text here. My biggest deepest darkest secret issome random description text here. My biggest deepest darkest secret issome random description text here. My biggest deepest darkest secret is',
          type: 'kintoblock'
        },
        {
          name: 'service-2',
          description:
            'Some random description text here. My biggest deepest darkest secret is…',
          type: 'service'
        },
        {
          name: 'service-2',
          description: 'of course I’m not telling you here',
          type: 'service'
        }
      ]
    }
  ]

  return (
    <form className="kintoapp-create form-container" onSubmit={handleSubmit}>
      <div className="form-wrapper basic-info">
        <h3>Basic Info</h3>
        <h5>Give your baby a name, and a version number.</h5>

        <div className="form-body">
          <Field
            name="kintoAppName"
            label="application name"
            placeholder="Enter a name for your application"
            component={FieldValidation}
            validate={required}
            type="text"
          />
          <div className="field-wrapper">
            <label htmlFor="versionNumber">Version number</label>
            <input
              type="text"
              name="versionNumber"
              className="disabled"
              value="1.0.0"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="form-wrapper blocks-and-services">
        <h3>KintoBlocks & Services</h3>
        <h5>
          Choose the build and give your baby a number so they don’t get mixed
          up in a sea of babies.
        </h5>

        <div className="form-body">
          <Field
            name="searchKintoBlocksAndServices"
            type="search"
            component={FieldValidation}
            validate={required}
            placeholder="Search KintoBlocks or services"
          />

          {addedBlocksServices.length ? (
            <div className="blocks-or-services">
              {addedBlocksServices.map((block, key) => (
                <div key={key} className="block">
                  <div className="delete-block" />
                  <div className="icon-text-and-version">
                    <div className={`main-icon ${block.type}`} />
                    <div className="text">
                      <h3 className="name">{block.name}</h3>
                      <h6 className="description">{block.description}</h6>
                    </div>
                    <div className="version">
                      <select name="versionName" id="">
                        <option value="1.0.0">1.0.0</option>
                        <option value="1.1.0">1.1.0</option>
                      </select>
                    </div>
                  </div>

                  {block.dependencies.length ? (
                    <div className="dependencies-exist">
                      <div className="expand">
                        <div className="icons">
                          {block.dependencies
                            .filter((item, index) => index <= 4)
                            .map((dep, key) => (
                              <div key={key} className={`icon ${dep.type}`} />
                            ))}
                          {block.dependencies.length > 4 && (
                            <div className="number">
                              +{block.dependencies.length - 4}
                            </div>
                          )}
                        </div>
                        <div className="expand-close-indicator">
                          <h6>Expand</h6>
                          <div className="expand-close" />
                        </div>
                      </div>
                      <div className="extra-information">
                        {block.dependencies.map((dep, key) => (
                          <div key={key} className="row">
                            <div className={`icon ${dep.type}`} />
                            <div className="text">
                              <h3>{dep.name}</h3>
                              <h6>{dep.description}</h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
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
          {addedBlocksServices.length ? (
            <div className="combine-buttons">
              <Button
                buttonType="secondary"
                image="/images/icon-split-glyph.svg"
              >
                Split All Duplicate Instances
              </Button>
              <Button
                buttonType="secondary"
                image="/images/icon-combine-glyph.svg"
              >
                Combine All Duplicate Instances
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="form-wrapper clients">
        <h3>Clients</h3>
        <h5>Give your baby a name, and a version number</h5>

        <div className="form-body">
          <div className="top">
            <h4 className="bold">Use Existing Client</h4>
            <Field
              help="Choose an existing repository to use for your client"
              label="REPOSITORY"
              name="repository"
              id="repository"
              close={true}
              placeholder="Enter a name for the repository"
              component={FieldValidation}
            />
            <div className="line" />
          </div>
          <div className="bottom">
            <Button buttonType="secondary">Create New Client</Button>
            <Button buttonType="secondary">Use Existing Client</Button>
          </div>
        </div>
      </div>

      <div className="form-wrapper protocols">
        <h3>Protocols</h3>
        <h5>Choose a communication protocol.</h5>

        <div className="form-body">
          <Field label="gRPC" name="gRPC" id="gRPC" component={CheckBox} />
          <Field
            label="RESTFUL"
            name="RESTFUL"
            id="RESTFUL"
            component={CheckBox}
          />
        </div>
      </div>
    </form>
  )
}

export default reduxForm({ form: 'kintoAppCreateForm' })(KintoAppCreateForm)
