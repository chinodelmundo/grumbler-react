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

        var newGrumble = {
            username: this.props.auth.authenticated ? this.props.auth.username : this.props.username,
            text: this.state.text.trim(),
            annoyanceLevel: this.state.annoyanceLevel,
            authenticated: this.props.auth.authenticated,
            imgLink: this.props.auth.imgLink ? this.props.auth.imgLink : ''
        };

        

        if (newGrumble.username && newGrumble.text) {
            GrumbleFormActions.addGrumble(newGrumble);
            GrumbleFormActions.clearGrumbleForm();

            let socket = io.connect();
            socket.emit('newGrumble', username);

            alertify.set('notifier','position', 'bottom-left');
            alertify.message('Grumble submitted! Please wait.');
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
                
                        {
                            !this.props.auth.authenticated && 
                            <div>
                                <label className="input-label">Username</label>
                                <input value={this.props.username} onChange={this.props.handleUsernameChange} required />
                            </div>
                        }

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