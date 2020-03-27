export const defaultStyle = {
  option: base => ({
    ...base,
    '&:hover': {
      backgroundColor: 'rgb(248, 248, 248)'
    },
    color: 'rgb(72, 72, 72)',
    backgroundColor: 'white',
    cursor: 'pointer',
    padding: '6px 12px'
  }),
  container: base => ({
    ...base,
    border: 'none'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: base => ({
    ...base,
    backgroundColor: 'rgb(240, 240, 240)',
    boxShadow: 'none',
    color: 'rgb(71, 71, 71)',
    border: 'none',
    minHeight: '36px',
    height: '36px',
    borderRadius: '4px',
    cursor: 'pointer'
  })
};

export const small = {
  option: base => ({
    ...base,
    '&:hover': {
      backgroundColor: 'rgb(248, 248, 248)'
    },
    color: 'rgb(72, 72, 72)',
    backgroundColor: 'white',
    cursor: 'pointer',
    padding: '4px 12px'
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: '2px 8px'
  }),
  container: base => ({
    ...base,
    border: 'none'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  singleValue: base => ({
    ...base,
    fontSize: '0.825em',
    top: '50%'
  }),
  control: base => ({
    ...base,
    backgroundColor: 'rgb(240, 240, 240)',
    boxShadow: 'none',
    color: 'rgb(71, 71, 71)',
    border: 'none',
    minHeight: '29px',
    height: '29px',
    borderRadius: '3px',
    cursor: 'pointer'
  })
};

export const transparent = {
  option: base => ({
    ...base,
    '&:hover': {
      backgroundColor: 'rgb(248, 248, 248)'
    },
    color: 'rgb(72, 72, 72)',
    backgroundColor: 'white',
    cursor: 'pointer',
    padding: '6px 12px'
  }),
  container: base => ({
    ...base,
    border: 'none'
  }),
  valueContainer: base => ({
    ...base,
    padding: 0
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: base => ({
    ...base,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    color: 'rgb(71, 71, 71)',
    border: 'none',
    fontSize: '1em',
    minHeight: '25px',
    marginTop: '-2px',
    marginLeft: '-2px',
    marginBottom: '2px',
    height: '25px',
    cursor: 'pointer'
  })
};

export const navbar = {
  option: base => ({
    ...base,
    '&:hover': {
      backgroundColor: 'rgb(248, 248, 248)'
    },
    color: 'rgb(72, 72, 72)',
    backgroundColor: 'white',
    cursor: 'pointer',
    padding: '6px 12px'
  }),
  container: base => ({
    ...base,
    border: 'none'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: base => ({
    ...base,
    backgroundColor: 'rgb(246, 246, 246)',
    boxShadow: 'none',
    color: 'rgb(71, 71, 71)',
    border: 'none',
    minHeight: '36px',
    height: '36px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgb(240, 240, 240)',
    }
  })
};
