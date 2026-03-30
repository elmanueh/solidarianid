declare module "react-select-country-list" {
  interface CountryOption {
    label: string
    value: string
  }

  class CountryList {
    getData(): CountryOption[]
  }

  function countryList(): CountryList

  export default countryList
}
