import { expect } from 'chai'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import Login from '../page-objects/login.page'

describe('create kintoBlock', () => {
  it('should redirect the user to login  when he is trying to access list kbs and he is not logged in', () => {
    KintoBlockList.open()
    Login.loginForm.waitForVisible()
    expect(Login.getUrl()).to.eql('/log-in')
  })

  it('should redirect the user to create kb when he is trying to access list kbs with no kbs created', () => {
    Login.login()
    KintoBlockList.open()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eq(true)
  })

  it('should validate inputs and not allow not allow user to create a kb without invalid data', () => {
    KintoBlockCreate.open()
    KintoBlockCreate.name.input.setValue('test name')
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.repository.error.waitForVisible()
    expect(KintoBlockCreate.repository.error.getText()).to.eql('Required')
  })

  it('should create a new kb and redirect to list kbs page', () => {
    KintoBlockCreate.name.input.setValue('test name')
    KintoBlockCreate.starterPack.input.selectByIndex(0)
    KintoBlockCreate.repository.input.setValue('repo')
    KintoBlockCreate.memLimit.input.setValue('65')
    KintoBlockCreate.memRequests.input.setValue('65')
    KintoBlockCreate.minCpu.input.setValue('65')
    KintoBlockCreate.maxCpu.input.setValue('65')
    KintoBlockCreate.submitGlobal()
    KintoBlockList.getCard(0).waitForVisible()
    const name = KintoBlockList.getCard(0)
      .element('.name')
      .getText()
    expect(name).to.eql('test name')
  })
})

describe('manage kintoBlock', () => {
  it('should redirect to kb manage when clicking on that kintoblock in list', () => {
    KintoBlockList.open()
    KintoBlockList.getCard(0).waitForVisible()
    const name = KintoBlockList.getCard(0)
      .element('.name')
      .getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    expect(KintoBlockManage.title.getText()).to.eq(name)
  })

  it('env params add button should be disabled when added data is empty', () => {
    expect(
      KintoBlockManage.envInput
        .element('.bottom .icon-column button')
        .isEnabled()
    ).to.eql(false)
    KintoBlockManage.addEnvKey.setValue('name')
    KintoBlockManage.addEnvValue.setValue('value')
    expect(
      KintoBlockManage.envInput
        .element('.bottom .icon-column button')
        .isEnabled()
    ).to.eql(true)
  })

  it('should add a new env row when entering data correctly', () => {
    expect(
      KintoBlockManage.envInput.element('.empty-message').isVisible()
    ).to.eql(true)
    KintoBlockManage.addEnvKey.setValue('name')
    KintoBlockManage.addEnvValue.setValue('value')
    KintoBlockManage.envInput.element('.bottom .icon-column button').click()
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].key"] input')
        .getValue()
    ).to.eql('name')
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].value"] input')
        .getValue()
    ).to.eql('value')
  })
})
