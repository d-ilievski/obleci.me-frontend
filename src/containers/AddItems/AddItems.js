import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import AddItemsSidebar from '../../components/AddItemsSidebar/AddItemsSidebar';
import ItemsList from '../../components/ItemsList/ItemsList';
import withAuth from '../../components/Authentication/WithAuth/WithAuth';
import Modal from '../../components/Modal/Modal';
import classes from '../../containers/AddItems/AddItems.css';
import UploadIcon from 'react-icons/lib/fa/upload';

class AddItems extends Component {

    constructor(props) {
        super(props);
        this.logoutBind = this
            .logoutBind
            .bind(this);
    }

    state = {
        data: [],
        activeAdId: 1,
        itemData: [],
        backdropShow: false,
        itemImage: null,
        itemName: null,
        itemDesc: null,
        modalShow: false
    }

    logoutBind() {
        this
            .props
            .logoutHandler();
    }

    fetchAdsHandler = () => {
        fetch(`http://localhost:8080/ad/myAds`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
                'Accept': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        }).then(json => {
            this.setState({
                data: json,
                activeAdId: (json.length - 1)
            });
            this.fetchItemsHandler(json.length - 1);
        }).catch(error => {
            console.log(error);
            console.log(this.props);
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.fetchAdsHandler();
        }, 300);
    }

    optionHandler = key => {
        this.setState(prevState => {
            return {activeAdId: key}
        });
        this.fetchItemsHandler(key);
    }

    fetchItemsHandler = (key) => {
        fetch(`http://localhost:8080/ad/item/` + this.state.data[key].id, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        }).then(json => {
            this.setState({itemData: json});
        }).catch(error => {
            console.log(error);
        });
    }

    imageUploadHandler = event => {
        //this.setState({selectedImage : event.target.files[0]});
        var data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('aId', this.state.data[this.state.activeAdId].id);
        this.setState({itemImage: null});

        fetch(`http://localhost:8080/ad/item/uploadImg`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
                //'Content-Type' : 'multipart/form-data; boundary='
            },
            body: data
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.text();
        }).then(path => {
            this.setState({itemImage: path});
        }).catch(error => {
            console.log(error);
        });
    }

    itemNameChangeHandler = event => {
        this.setState({itemName: event.target.value});
    }

    itemDescriptionChangeHandler = event => {
        this.setState({itemDesc: event.target.value});
    }

    addItemHandler = (event) => {
        //event.preventDefault();

        fetch(`http://localhost:8080/ad/addItem`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'n': this.state.itemName,
                'd': this.state.itemDesc,
                'a_id': this.state.data[this.state.activeAdId].id,
                'ip': this.state.itemImage
            })
        }).then(res => {
            this.toggleAddItemModalHandler();
            this.fetchItemsHandler(this.state.activeAdId);

            const newData = [...this.state.data];

            fetch(`http://localhost:8080/ad/getStatus?id=` + newData[this.state.activeAdId].id, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('jwt')
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                newData[this.state.activeAdId].active = data.status;
            });

            this.setState(prevState => {
                return ({data: newData});
            });
        }).catch(error => {
            console.log(error);
        });
    }

    toggleAddItemModalHandler = () => {
        this.setState((prevState) => {
            return {
                modalShow: !prevState.modalShow
            }
        });

        this.setState({itemImage: null});
    }

    toggleItemAvailableHandler = (id, status) => {
        var data = {
            'i_id': id,
            's': status
        }

        fetch(`http://localhost:8080/ad/item/changeStatus`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        }).then(data => {
            const newItemData = [...this.state.itemData];
            var result = newItemData.filter(function (obj) {
                return obj.id === id;
            });
            result[0].s = data.s;

            const newData = [...this.state.data];

            fetch(`http://localhost:8080/ad/getStatus?id=` + newData[this.state.activeAdId].id, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('jwt')
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                newData[this.state.activeAdId].active = data.status;
            });

            this.setState(prevState => {
                return ({itemData: newItemData, data: newData});
            });

            this.fetchItemsHandler(this.state.activeAdId);

        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <Auxiliary>
                <Modal show={this.state.modalShow} toggleModal={this.toggleAddItemModalHandler}>
                    <form onSubmit={this.addItemHandler}>
                        <label className={classes.Label}>
                            Име на предметот:
                        </label>
                        <input
                            autoFocus
                            maxLength="254"
                            type="text"
                            className={classes.Input}
                            onChange={this.itemNameChangeHandler}/>
                        <label className={classes.Label}>
                            Опис:
                        </label>
                        <textarea
                            maxLength="254"
                            className={classes.Input}
                            onChange={this.itemDescriptionChangeHandler}/>
                        <label className={classes.Label}>
                            Слика од предметот:
                        </label>

                        <label
                            htmlFor='file-upload'
                            style={{
                            margin: '10px',
                            display: 'block',
                            cursor: 'pointer'
                        }}>
                            <UploadIcon/>
                            Одбери слика {this.state.itemImage !== null
                                ? <img
                                        style={{
                                        maxWidth: '100%'
                                    }}
                                        src={this.state.itemImage}
                                        alt="Сликата не е достапна."/>
                                : null}
                        </label>
                        <input
                            id="file-upload"
                            style={{
                            display: 'none'
                        }}
                            onChange={this.imageUploadHandler}type="file"/>
                        <div className={classes.ButtonRow}>
                            <input value="Додади" type="submit"/>
                        </div>
                    </form>
                </Modal>
                <AddItemsSidebar
                    fetchItemsHandler={this.fetchItemsHandler}
                    Data={this.state.data}
                    optionHandler={this.optionHandler}
                    selected={this.state.activeAdId}
                    addItemHandler={this.toggleAddItemModalHandler}
                    DisabledButton={this.state.data.length === 0
                    ? true
                    : false}/>
                <ItemsList
                    toggleAvailable={this.toggleItemAvailableHandler}
                    Data={this.state.itemData}/>
            </Auxiliary>
        );
    }
}

export default withAuth(AddItems);