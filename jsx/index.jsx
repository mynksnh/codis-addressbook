class Person extends React.Component {
    constructor(){
        super();
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.saved = this.saved.bind(this);
    }
    
    render() {
        const data = this.props.data;
        return (
            <div key={data.key}>
               <div className="tile-button-container">
                    <div>
                        <a href="#" className="edit-button" onClick={this.edit}><i className="fa fa-lg fa-pencil-square-o"></i></a>
                    </div>
                    <div>
                        <a href="#" className="delete-button" onClick={this.delete}><i className="fa fa-lg fa-times"></i></a>
                    </div>
                </div>
                <div><label>Name: </label><div>{data.FirstName} {data.LastName}</div></div>
                <div><label>Nickname: </label><div>{data.NickName}</div></div>
                <div><label>Date of Birth: </label><div>{data.DOB}</div></div>
            </div>
        );
    }

    edit(){
        const data = this.props.data;
        ReactDOM.render(<AddPerson data={data.key} />, document.getElementById("app"));
    }
    delete(){
        if(confirm("Are you sure you want to delete this person?")){
            fetch('/api/person/'+this.props.data.key, {
                method: 'delete'
               }).then(response =>
                response.json()
              ).then(data => {
                this.saved();
              }).catch(err => {
                console.log(err);
              });
        }
    }
    saved(){
        let elem=document.getElementById("app");
        ReactDOM.unmountComponentAtNode(elem);
        ReactDOM.render(<App saved="true"/>, elem);
    }
}
class Address extends React.Component {
    constructor(){
        super();
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.saved = this.saved.bind(this);
    }
    render() {
        const data = this.props.data;
        return (
            <div key={data.key}>
                <div className="tile-button-container">
                    <div>
                        <a href="#" className="edit-button" onClick={this.edit}><i className="fa fa-lg fa-pencil-square-o"></i></a>
                    </div>
                    <div>
                        <a href="#" className="delete-button" onClick={this.delete}><i className="fa fa-lg fa-times"></i></a>
                    </div>
                </div>
                <div>{data.Line1}<br/>{data.Line2}<br/>{data.Country}<br/>{data.PostCode}</div><hr/>
            </div>
        );
    }

    edit(){
        const data = this.props.data;
        ReactDOM.render(<AddAddress data={data.key} />, document.getElementById("app"));
    }
    delete(){
        if(confirm("Are you sure you want to delete this address?")){
            fetch('/api/address/'+this.props.data.key+'/'+this.props.personId, {
                method: 'delete'
               }).then(response =>
                response.json()
              ).then(data => {
                this.saved();
              }).catch(err => {
                console.log(err);
              });
        }
    }
    saved(){
        let elem=document.getElementById("app");
        ReactDOM.unmountComponentAtNode(elem);
        ReactDOM.render(<App saved="true"/>, elem);
    }
}
class AddressList extends React.Component {
    constructor(){
        super();
        this.new = this.new.bind(this);
    }
    render() {
        const data = this.props.data;
        const addresses = data.map(address =>
            <Address data={address} key={address.key} personId={this.props.personId} />
          );
        return (
            <div>
                <label>Addresses:</label>
                {addresses}
                <a href="#" onClick={this.new}>New Address</a>
            </div>
        );
    }
    new(){
        ReactDOM.render(<AddAddress personId={this.props.personId}/>, document.getElementById("app"));
    }
}
class IndexTile extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <div className="grid-item">
                <div>
                    <Person data={data.Person} />
                </div>
                <div>
                    <AddressList data={data.Addresses} personId={data.Person.key} />
                </div>
            </div>
        );
    }
}
class IndexTiles extends React.Component {
    constructor() {
        super();
        this.state = { people: [] };
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        fetch('/api/people').then(response =>
          response.json()
        ).then(data => {
          this.setState({ people: data.records });
        }).catch(err => {
          console.log(err);
        });
    }
    render() {
        const peopleList = this.state.people;
        const tiles = peopleList.map(person =>
            <IndexTile data={person} key={person.key} />
          );
        return (
            <React.Fragment>
                {tiles}
            </React.Fragment>
        );
    }
}