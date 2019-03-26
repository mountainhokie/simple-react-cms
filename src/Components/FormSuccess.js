import React, { Component} from 'react';

class FormSuccess extends Component {
	constructor(props) {
    super(props);
    this.closeMessage = this.closeMessage.bind(this);
  }
  closeMessage = (e) => {
    e.preventDefault();
    const { showMessage } = this.props;
    showMessage(null);
  };

	render() {
		const { message } = this.props;
		return(
			<div className="col-12 alert alert-success px-3">
				{message}
				<button type="button" className="close" data-dismiss="alert" aria-label="Close"
				onClick={e =>
	          this.closeMessage(e)
          }>
    			<span aria-hidden="true">&times;</span>
  			</button>
			</div>
		)
	}
}

export default FormSuccess