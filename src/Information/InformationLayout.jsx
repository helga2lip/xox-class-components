/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import { Component } from 'react';

class InformationLayoutContainer extends Component {

    onResetClick = () => {
        this.props.dispatch({ type: 'RESTART_GAME' })
    }

    render() {
        return <div className="flex justify-between items-center">
            <div className="text-2xl">
                {this.props.isGameEnded
                    ? `Победа: ${this.props.currentPlayer}`
                    : this.props.isDraw
                        ? 'Ничья'
                        : `Ходит: ${this.props.currentPlayer}`
                }
            </div>
            <button className="px-5 py-2 bg-orange-400 rounded-md text-2xl" onClick={this.onResetClick}>Начать заново</button>
        </div >
    }


}

const mapStateToProps = (state) => {
    return {
        currentPlayer: state.currentPlayer,
        isGameEnded: state.isGameEnded,
        isDraw: state.isDraw,
    }
}

export const InformationLayout = connect(mapStateToProps)(InformationLayoutContainer);