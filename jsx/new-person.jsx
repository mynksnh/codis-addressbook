class AddPerson extends React.Component {
    constructor(){
        super();
        this.index = this.index.bind(this);
        this.saved = this.saved.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {person:{"key":-1, "FirstName": "", "LastName": "", "DOB":"", "NickName":""}};
        this.showError = this.showError.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        if(!isNaN(this.props.data)){
            fetch('/api/person/'+ this.props.data).then(response =>
                response.json()
              ).then(data => {
                this.setState({ person: data.person });
              }).catch(err => {
                console.log(err);
              });
        }
    }
    render() {
        const p = this.state.person;
        return (
            <div className="form">
                <div id="snackbar"></div>
                <div>
                    <a href="#" onClick={this.index}><i className="fa fa-lg fa-angle-double-left"></i> back</a>
                </div>
                <form name="person" onSubmit={this.handleSubmit}>
                    <div><label className="lform">First Name: </label><input type="text" name="fname" defaultValue={p.FirstName} onBlur={this.handleChange} /></div>
                    <div><label className="lform">Last Name: </label><input type="text" name="lname" defaultValue={p.LastName} onBlur={this.handleChange} /></div>
                    <div><label className="lform">Date of Birth: </label><input type="date" name="bday" defaultValue={p.DOB} onBlur={this.handleChange} /></div>
                    <div><label className="lform">Nickname: </label><input type="text" name="nname" defaultValue={p.NickName} onBlur={this.handleChange} /></div>
                    <div><input type="submit" name="submit" value="Submit" /></div>
                </form>
            </div>
        );
    }
    index(){
        ReactDOM.render(<App />, document.getElementById("app"));
    }
    saved(){
        ReactDOM.render(<App saved="true"/>, document.getElementById("app"));
    }
    handleSubmit(e){
        e.preventDefault();
        const form = document.forms.person;
        if(this.state.person.key > 0){
            fetch('/api/person/'+this.state.person.key, {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                 "FirstName": form.fname.value || "",
                 "LastName": form.lname.value || "",
                 "DOB": form.bday.value || "",
                 "NickName": form.nname.value || ""
                })
               }).then(response =>
                response.json()
              ).then(data => {
                if(data.error){
                    this.showError(data.error);
                }
                else{
                    this.saved();
                }
              }).catch(err => {
                this.showError(err);
                console.log(err);
              });
        }
        else{
            fetch('/api/person', {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                 "FirstName": form.fname.value || "",
                 "LastName": form.lname.value || "",
                 "DOB": form.bday.value || "",
                 "NickName": form.nname.value || ""
                })
               }).then(response => 
                response.json()
                ).then(data => {
                    if(data.error){
                        this.showError(data.error);
                    }
                    else{
                        this.saved();
                    }
              }).catch(err => {
                console.log(err);
              });
        }
    }
    handleChange(o){
        switch(o.target.name){
            case "fname": case "lname": if((o.target.value && new RegExp(/[^a-zA-Z]/).test(o.target.value)) || !o.target.value || o.target.value.length > 20) {
                o.target.style.borderColor = "red";
            }
            else{
                o.target.style.borderColor="green";
            }
            break;
            case "bday":  if((o.target.value && new Date(o.target.value) > new Date()) || !o.target.value){
                o.target.style.borderColor = "red";
            }
            else{
                o.target.style.borderColor="green";
            }
            break;
            case "nname": if((o.target.value && new RegExp(/[^a-zA-Z0-9]/).test(o.target.value)) || o.target.value > 20){
                o.target.style.borderColor = "red";
            }
            else{
                o.target.style.borderColor="green";
            }
            break;
        }
    }
    showError(err){
        const x = document.getElementById("snackbar");
        x.className = "error show";
        x.innerHTML = err;
        x.onclick = function(o){
            x.className = x.className.replace("show", "");
        };
    }
}