import React from 'react'
import { Field, FormSection } from 'redux-form'
import { FieldValidation, Toggle, Slider } from '../../forms'
import {
  required,
  isBetween64,
  isBetween1000
} from '../../../helpers/forms/validators'
import { lessThanFormat, allowFalse } from '../../../helpers/forms/formatters'
import { number } from '../../../helpers/forms/parsers'

class KintoBlockHardwareData extends FormSection {
  static defaultProps = {
    name: 'hardwareData'
  }

  render() {
    const { isDedicatedCPU, resetCPUHandler } = this.props
    const selectNumberOfCores = [1, 2, 4, 8, 16, 32, 64, 128]
    const sliderMarks = {
      50: '50%',
      60: '60%',
      70: '70%',
      80: '80%',
      90: '90%',
      100: '100%'
    }
    return (
      <div className="form-wrapper hardware-requirements">
        <h3>Hardware Requirements</h3>
        <h5>
          What does this baby need to stay healthy and kicking? You can still
          modify these settings later.
        </h5>

        <div className="form-body">
          <div className="memory">
            <div className="input-container">
              <Field
                name="memLimit"
                parse={number}
                label="Memory Limits"
                placeholder="64 - 262144 MB"
                component={FieldValidation}
                validate={[required, isBetween64]}
                normalize={lessThanFormat(262144)}
                type="number"
                help="Starter pack is the programming language you would like to use for this project"
              />
            </div>
            <div className="input-container">
              <Field
                name="memRequests"
                parse={number}
                label="Memory Requests"
                placeholder="64 - 262144 MB"
                component={FieldValidation}
                validate={[required, isBetween64]}
                normalize={lessThanFormat(262144)}
                type="number"
                help="Starter pack is the programming language you would like to use for this project"
              />
            </div>
          </div>
          <div className="line" />
          <div className="cpu">
            <div className="toggle-wrapper">
              <Field
                onChange={resetCPUHandler}
                name="dedicatedCpu"
                label="Dedicated CPUs"
                component={Toggle}
                normalize={allowFalse}
                help="Starter pack is the programming language you would like to use for this project"
              />
            </div>

            {isDedicatedCPU ? (
              <div className="limits-requests">
                <div className="input-container">
                  <Field
                    name="maxCpu"
                    label="CPU Limits"
                    parse={number}
                    component={FieldValidation}
                    validate={required}
                    type="select"
                    help="Starter pack is the programming language you would like to use for this project"
                  >
                    <option>Number of cores</option>
                    {selectNumberOfCores.map((c, i) => (
                      <option value={c} key={i}>
                        {c}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="input-container">
                  <Field
                    name="minCpu"
                    label="CPU Requests"
                    parse={number}
                    placeholder="1 - 1000 m"
                    component={FieldValidation}
                    validate={required}
                    type="select"
                    help="Starter pack is the programming language you would like to use for this project"
                  >
                    <option>Number of cores</option>
                    {selectNumberOfCores.map((c, i) => (
                      <option value={c} key={i}>
                        {c}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            ) : (
              <div className="limits-requests">
                <div className="input-container">
                  <Field
                    name="maxCpu"
                    label="CPU Limits"
                    parse={number}
                    placeholder="1 - 1000 m"
                    component={FieldValidation}
                    validate={[required, isBetween1000]}
                    normalize={lessThanFormat(1000)}
                    type="number"
                    help="Starter pack is the programming language you would like to use for this project"
                  />
                </div>
                <div className="input-container">
                  <Field
                    name="minCpu"
                    label="CPU Requests"
                    parse={number}
                    placeholder="1 - 1000 m"
                    component={FieldValidation}
                    validate={[required, isBetween1000]}
                    normalize={lessThanFormat(1000)}
                    type="number"
                    help="Starter pack is the programming language you would like to use for this project"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="line" />
          <div className="scaling">
            <Field
              name="scalingThreshold"
              label="Scaling Threshold"
              component={Slider}
              min={50}
              marks={sliderMarks}
              step={null}
              help="Starter pack is the programming language you would like to use for this project"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default KintoBlockHardwareData
