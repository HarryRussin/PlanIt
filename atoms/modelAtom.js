import {atom} from 'recoil'

export const DimensionModalState = atom({
    key:'DimensionModalState',
    default:false
})

export const TTElementModalState = atom({
    key:'TTElementModalState',
    default:false
})

export const TTEinfoState = atom({
    key:'TTEinfoState',
    default:{title:'',detail:'',timestamp:'',homework:[{title:'',desc:'',completed:false}]}
})