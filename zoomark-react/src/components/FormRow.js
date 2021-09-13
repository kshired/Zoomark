function FormRow({ title, value, onChange }) {
  return (
    <div
      className="form-row"
      style={{
        textAlign: 'center',
        marginRight: 0,
        marginLeft: 0,
      }}
    >
      <div
        className="col-md-6"
        style={{
          width: '150px',
          paddingRight: 0,
          paddingLeft: 0,
          textAlign: 'right',
          maxWidth: '35%',
        }}
      >
        <label
          className="col-form-label"
          style={{
            paddingRight: '10px',
            marginTop: '5px',
          }}
        >
          {title}
        </label>
      </div>
      <div
        className="col"
        style={{
          marginTop: '5px',
          paddingRight: 0,
          textAlign: 'left',
          maxWidth: '70%',
        }}
      >
        <input
          className="form-control"
          type="text"
          style={{
            width: '175px',
          }}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default FormRow;
