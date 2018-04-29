import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'


const MiddleText = (props) => (
  <div className="home-ui">
    {props.element}
  </div>
)

class ShareLink extends React.Component {
  state = {
    value: '',
    copied: false,
  };
 
  render() {
    return (
      <div className="home-ui">
        <p> Share this link to play with a friend</p>
        <p> {this.props.value} </p>
        <CopyToClipboard text={this.props.value}
          onCopy={() => this.setState({copied: true})}>
          <button>Copy to clipboard</button>
        </CopyToClipboard>
        <br/>
        <br/>
        {this.state.copied ? <span style={{color: 'blue'}}>Copied</span> : null}
      </div>
    );
  }
}

export {
  MiddleText,
  ShareLink,
}

