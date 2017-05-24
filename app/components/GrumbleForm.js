import React from 'react';
import GrumbleFormStore from '../stores/GrumbleFormStore'
import GrumbleFormActions from '../actions/GrumbleFormActions';

class GrumbleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = GrumbleFormStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        GrumbleFormStore.listen(this.onChange);
    }

    componentWillUnmount() {
        GrumbleFormStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        var username = this.props.username.trim();
        var text = this.state.text.trim();
        var annoyanceLevel = this.state.annoyanceLevel;
        if (username && text) {
            GrumbleFormActions.addGrumble(username, text, annoyanceLevel);

            let socket = io.connect();
            socket.emit('newGrumble', this.props.username);
        }
    }

    render() {
        return (
            <div className="user-grumble">
                <div className="panel-title">
                    New Grumble
                </div>
                <div className="new-grumble-panel">
                    <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
                
                        <label className="input-label">Username</label>
                        <input value={this.props.username} onChange={this.props.handleUsernameChange} required/>

                        <label className="input-label">Grumble Text</label>
                        <textarea value={this.state.text} onChange={GrumbleFormActions.updateText}
                            className="input-grumble-text" rows="4" required />


                        <label className="input-label">Annoyance Level</label>
                        <select value={this.state.annoyanceLevel} onChange={GrumbleFormActions.updateAnnoyanceLevel} className="grumble-input">
                            <option value="0">Neutral</option>
                            <option value="1">Mildly Annoyed</option>
                            <option value="2">Infuriated</option>
                            <option value="3">Extremely Angry</option>
                        </select>

                        <button type="submit" className="pure-button pure-button-primary input-button">Submit</button>
                    </form>
                    <span className='help-block'>{this.state.helpBlock}</span>
                </div>
            </div>
        );
    }
}

export default GrumbleForm;