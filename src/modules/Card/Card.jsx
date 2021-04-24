import React, { Component } from 'react';
import styles from './Card.module.css';

class Card extends Component {
    state = {
        isMoreVisible: false
    }

    makeMoreVisible() {
        this.setState({
            isMoreVisible: !this.state.isMoreVisible
        })
    }
    
    render() {
        const props = this.props;
        return (
            <>
            <div className={styles.card_wrapper}>
                <div className={this.state.isMoreVisible ? styles.unvisable : styles.main__active}>
                    <div className={styles.img_wrapper}>
                        <img src={props.img} alt="" className={styles.img}/>
                    </div>
                    <div className={styles.name}>
                        {props.name}
                    </div>
                    <div className={styles.abv}>
                        vol: {props.abv}%
                    </div>
                </div>
                <div className={ this.state.isMoreVisible ? styles.more : styles.unvisable}>
                <div className={styles.description}>
                    <span className={styles.description__title}>Description</span> <br/>
                    {props.description}
                </div>
                </div>
                <button onClick={() => {this.makeMoreVisible()}} className={styles.btn}>{this.state.isMoreVisible ? <span>Back</span> : <span>More details</span> }</button>
                
            </div>
            </>
        );
    }
}

export default Card;