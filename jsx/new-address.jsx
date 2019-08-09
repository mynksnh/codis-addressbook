class AddAddress extends React.Component {
    constructor(){
        super();
        this.index = this.index.bind(this);
        this.saved = this.saved.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {address:{"key":-1, "Line1": "", "Line2": "", "Country":"", "PostCode":""}};
        this.showError = this.showError.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        if(!isNaN(this.props.data)){
            fetch('/api/address/'+ this.props.data).then(response =>
                response.json()
              ).then(data => {
                this.setState({ address: data.address });
              }).catch(err => {
                console.log(err);
              });
        }
    }
    render() {
        const a = this.state.address;
        return (
            <div className="form">
                <div id="snackbar"></div>
                <div>
                    <a href="#" onClick={this.index}><i className="fa fa-lg fa-angle-double-left"></i> back</a>
                </div>
                <form name="address" onSubmit={this.handleSubmit}>
                    <div><label className="lform">Line1: </label><input type="text" name="l1" defaultValue={a.Line1} onBlur={this.handleChange} /></div>
                    <div><label className="lform">Line2: </label><input type="text" name="l2" defaultValue={a.Line2} onBlur={this.handleChange} /></div>
                    <div><label className="lform">Country: </label>
                    <select type="date" name="co" defaultValue={a.Country} selected={a.Country} onBlur={this.handleChange}>
                        <option value="Albania">Albania</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Austria">Austria</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="East Germany">East Germany</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Guernsey">Guernsey</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Italy">Italy</option>
                        <option value="Jersey">Jersey</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macedonia">Macedonia</option>
                        <option value="Malta">Malta</option>
                        <option value="Metropolitan France">Metropolitan France</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Norway">Norway</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Spain">Spain</option>
                        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="Union of Soviet Socialist Republics">Union of Soviet Socialist Republics</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Vatican City">Vatican City</option>
                        <option value="Åland Islands">Åland Islands</option>
                    </select>
                    </div>
                    <div><label className="lform">PostCode: </label><input type="text" name="po" defaultValue={a.PostCode} onBlur={this.handleChange} /></div>
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
        const form = document.forms.address;
        if(this.state.address.key > 0){
            fetch('/api/address/'+this.state.address.key, {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                 "Line1": form.l1.value || "",
                 "Line2": form.l2.value || "",
                 "Country": form.co.value || "",
                 "PostCode": form.po.value || ""
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
        else{
            fetch('/api/address', {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({"personId":this.props.personId, "address": {
                 "Line1": form.l1.value || "",
                 "Line2": form.l2.value || "",
                 "Country": form.co.value || "",
                 "PostCode": form.po.value || ""
                }})
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
            case "l1": if(!o.target.value || o.target.value.length > 20) {
                o.target.style.borderColor = "red";
            }
            else{
                o.target.style.borderColor="green";
            }
            break;
            case "l2":  if((o.target.value && new RegExp(/[^a-zA-Z ]/).test(o.target.value)) || o.target.value.length > 20){
                o.target.style.borderColor = "red";
            }
            else{
                o.target.style.borderColor="green";
            }
            break;
            case "po": if((o.target.value && new RegExp(/[^a-zA-Z0-9]/).test(o.target.value)) || !o.target.value ||o.target.value.length > 10){
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