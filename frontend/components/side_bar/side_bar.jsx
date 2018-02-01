import React from 'react';
import {Link} from 'react-router-dom';

class SideBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputClass: "collection-input hidden",
      value: "",

    };

    this.toggleForm = this.toggleForm.bind(this);
    this.update = this.update.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.toggleHelper = this.toggleHelper.bind(this);



  }

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.getAllCollections();
    }
  }

  // componentWillReceiveProps() {
  //   this.props.getAllCollections();
  // }


  update(attribute) {
    return (e) => {
      this.setState({
        [attribute]: e.target.value
      });
    };
  }

  toggleForm(e) {
    e.preventDefault();
    let newClass = this.toggleHelper(
      'inputClass',
      'collection-input hidden',
      'collection-input');
    this.setState({
      inputClass: newClass
    });
    if (newClass ==='collection-input hidden') {
      if (this.state.value) {
        this.props.createCollection({
          name: this.state.value
        });
        this.setState({
          value: "",
        });
      }
    }
  }

  toggleHelper(toggleClass, classOne, classTwo) {
    return this.state[toggleClass] === classOne ?
      classTwo : classOne;
  }

  closeForm(e) {
    e.preventDefault();
    if (e.currentTarget === e.target) {
      let newClass = this.toggleHelper(
        'inputClass',
        'collection-input hidden',
        'collection-input');
      this.setState({
        inputClass: newClass
      });
    }
  }

  render () {


    let { collections, currentUser } = this.props;
    if (!currentUser) {
      return <div></div>;
    }
    let names = collections.map((collection, idx) => {
      if (collection.games === undefined) {

        collection.games = [];
      }
      return (
        <li key={collection.id}>
          <Link to={`/collections/${collection.id}`}>
            <span className="collection-name">{collection.name}{ idx > 2 && ':'}</span>
            <span className='game-count'>{collection.games.length} game{collection.games.length !== 1 && 's'}</span>
          </Link>
        </li>
      );
    });

    return (
      <div className='side-bar'>
        <div className='side-bar-collections'>
          <div className='side-bar-header'>Collections</div>
          <ul className='collections-list'>
            {names}
          </ul>
          <form className="new-collection-form">
            <div className={this.state.inputClass}>

              <input
                onChange={this.update("value")}
                type="text"
                placeholder="New Collection"
                value={this.state.value}></input>
            </div>
            <span onClick={(e) => this.toggleForm(e)} className='collection-form-toggle'> + </span>
              {false && <p className={this.state.inputClass}>Add a Collection</p> }

          </form>
          {this.state.inputClass === 'collection-input' &&
            <div onClick={e => this.closeForm(e)} className='click-handler-div'>
            </div>
            }
        </div>
      </div>
    );
  }
}

export default SideBar;