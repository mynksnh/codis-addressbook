const contentNode = document.getElementById('app');

class App extends React.Component{
    constructor(){
        super();
    }
    render() {
        return (
            <React.Fragment>
                <div id="snackbar">Save Successful</div>
                <a href="#" onClick={this.add} className="float"><i className="fa fa-plus my-float"></i></a>
                <IndexTiles />
            </React.Fragment>
        );
    }

    add(){
        ReactDOM.render(<AddPerson />, contentNode)
    }
    componentDidMount() {
        if(this.props.saved){
            var x = document.getElementById("snackbar");
            x.className = "success show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    }
}

ReactDOM.render(<App />, contentNode);