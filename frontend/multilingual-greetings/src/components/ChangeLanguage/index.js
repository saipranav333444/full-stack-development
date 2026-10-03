import {Component} from 'react'

import {AppContainer, Heading, UlCard, Image} from './styledComponents'

import ButtonsCard from '../ButtonsCard'

class ChangeLanguage extends Component {
  state = {
    activeId: 'bfdf40eb-eec9-4a66-a493-752fe689f0d0',
  }

  buttonClick = id => {
    this.setState({
      activeId: id,
    })
  }

  render() {
    const {languageGreetingsList} = this.props
    const {activeId} = this.state

    const activeObj = languageGreetingsList.find(each => each.id === activeId)

    const imgUrl = activeObj.imageUrl
    const imgAlt = activeObj.imageAltText

    return (
      <AppContainer>
        <Heading>Multilingual Greetings</Heading>
        <UlCard>
          {languageGreetingsList.map(eachButton => (
            <ButtonsCard
              buttonDetail={eachButton}
              key={eachButton.id}
              buttonClick={this.buttonClick}
              isActive={eachButton.id === activeId}
            />
          ))}
        </UlCard>
        <Image src={imgUrl} alt={imgAlt} />
      </AppContainer>
    )
  }
}

export default ChangeLanguage
