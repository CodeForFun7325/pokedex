import "./page.css"; 

export default function ReportCiting() { 
  return (
    <div className="report-form">
      <h1>Report Pokemon Citing</h1>
      <br />
      <form> 
        <label htmlFor="name">Pokemon: </label>
        <input id="name" type="text" name="name"/>
      </form> 
    </div>
  ); 
}