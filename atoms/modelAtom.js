import {atom} from 'recoil'

export const DimensionModalState = atom({
    key:'DimensionModalState',
    default:false
})

export const TTElementModalState = atom({
    key:'TTElementModalState',
    default:false
})

export const TTElementPosState = atom({
    key:'TTElementPosState',
    default:[0,0]
})

export const TTEinfoState = atom({
    key:'TTEinfoState',
    default:{title:'',detail:'',timestamp:'',homeworks:[{title:'',desc:'',completed:false}]}
})

export const TableState = atom({
    key:'TableState',
    default:[]
})