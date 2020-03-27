import {states as statesList} from './geo';

export const taxTypes = [{
  value: 'individual',
  label: 'Individual/Sole Proprietor or Single Member LLC'
}, {
  value: 'llc',
  label: 'Limited Liability Business'
}, {
  value: 'cCorp',
  label: 'C Corporation'
},
{
  value: 'sCorp',
  label: 'S Corporation'
}, {
  value: 'partnership',
  label: 'Partnership'
}, {
  value: 'trustEstate',
  label: 'Trust/Estate'
}];
export const taxIdTypes = [{
  value: 'ssn',
  label: 'SSN'
}, {
  value: 'ein',
  label: 'EIN'
}];

export const states = statesList;
export const payeeExemptionCodes = ['N/A', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  .map(code => {
    if(code === 'N/A') {
      return {
        value: null,
        label: code
      };
    } else {
      return {
        value: code,
        label: String(code)
      };
    }
  });

export const factaExemptionCodes = ['N/A', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
  .map(letter => {
    if(letter === 'N/A') {
      return {
        value: null,
        label: letter
      };
    } else {
      return {
        value: letter,
        label: letter
      };
    }
  });

export const backupWithholding = [{
  value: false,
  label: 'No'
}, {
  value: true,
  label: 'Yes'
}];
