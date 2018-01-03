var e = module.exports;

const nameConstants = [

]



//different names
e['SET_REDUX_FORM_VALUE'] = '@@redux-form/CHANGE'
e['REGISTER_REDUX_FIELD'] = '@@redux-form/REGISTER_FIELD'
e['REDUX_INIT'] = '@@redux-form/INITIALIZE'


nameConstants.forEach(name => {
    e[name] = name
})