import React from 'react';
import moment from 'moment';



function ViewPatientRequestsPendingTable(props) {
    const tableStyle = {border:"1px solid grey"};
    const marginLeft = {marginLeft:"5px"};
    let formattedDate =  function(date) {
        return  (moment(date).isSame(moment(), 'day')?'HOY  ':'AYER ') + moment(date).format('HH:mm:ss');
        // return moment(date).format('DD/MM/YYYY || HH:mm:ss');
    }
    const setRowColor = (color) => ({backgroundColor : color})  
    const setTachado  = ()      => ({"text-decoration" : "line-through"})

    const buildPendingTable = (listOfPending = [], acceptedByHospital, idPending) => {
        return listOfPending.map(eachPending =>
            acceptedByHospital ?
            <p key={eachPending._id} >{eachPending.hospital.name}
        <button type="button" className="btn btn-success btn-xs" style={marginLeft}
            onClick={() => props.matchHospital(idPending,eachPending.hospital._id)}>
            <span className="glyphicon glyphicon-ok"></span>
        </button>
        </p>
        : <p key={eachPending.hospital._id}>{eachPending.hospital.name}</p>
        )
    }

    const tableBody = props.listOfPending.map((pending, i) => {
        let colorStyle = (pending.isCanceledByFin) ? setTachado()
        : (pending.timeout) ? setRowColor('pink')
        : (pending.acceptedByHospital.length) ? setRowColor('lightgreen')
        : (pending.viewedByHospitals.length) ? setRowColor('lightblue')
        : (pending.rejectedByHospital.length) ? setRowColor('orchid')
        : setRowColor(null)
    
        return ( <tr style={Object.assign({}, tableStyle, colorStyle)} key={pending._id} title= {pending.obs ? pending.obs : null}> 
                <td style={tableStyle}>{pending.dni}</td>
                <td style={tableStyle}>{pending.age}</td>
                <td style={tableStyle}>{pending.sex}</td>
                <td style={tableStyle}>{pending.cie10}</td>
                <td style={tableStyle}>{pending.complexity}</td>
                {pending.planExterno ?
                    (<td style={tableStyle}>{pending.healthcareplan.name} ({pending.planExterno}) </td>)
                :
                    (<td style={tableStyle}>{pending.healthcareplan.name} </td>)
                }
                <td style={tableStyle}>{formattedDate(pending.dateCreated)}</td>

                <td style={tableStyle}>
                    <a style={{cursor: "pointer", color: "blue"}} onClick={() => props.openModal(pending)}>Ver</a>
                </td>

                {pending.messages.length > 0 ? 
                (<td style={tableStyle}>
                    <button title="Ver Mensajes " type="button" className="btn btn-info btn-xs" style={marginLeft}
                        onClick={()=> props.verMensajes(pending.messages)}>
                    <span className="glyphicon glyphicon-envelope"></span>
                    </button>
                </td>)
                :
                (<td style={tableStyle}></td>)}

                {
                    pending.isCanceledByFin ? 
                    (<td style={tableStyle}></td>)
                    :
                    (
                    <td>
                        <button title="Cancelar solicitud" type="button" className="btn btn-danger btn-xs" style={marginLeft}
                            onClick={()=> props.cancelPatientRequest(pending._id)}>
                            <span className="glyphicon glyphicon-remove-circle"></span>
                        </button>
                    </td>
                    )
                }
                                
            </tr>
            )
        })

    return (
        <div>
            <div className="container">
                <div class="table-responsive">
                    <table className= "table">
                        <thead style={{border:"1px solid grey"}}>
                            <tr style={Object.assign({}, setRowColor('lightgrey'))}>
                                <th style={{border:"1px solid grey"}}>Paciente</th>
                                <th style={{border:"1px solid grey"}}>Edad</th>
                                <th style={{border:"1px solid grey"}}>Sexo</th>
                                <th style={{border:"1px solid grey"}}>Diagnóstico</th>
                                <th style={{border:"1px solid grey"}}>Complejidad</th>
                                <th style={{border:"1px solid grey"}}>Plan</th>
                                <th style={{border:"1px solid grey"}}>Fecha/Hora Creado</th>
                                <th style={{border:"1px solid grey"}}>Detalle</th>
                                <th style={{border:"1px solid grey"}}>Mensajes</th>
                                <th style={{border:"1px solid grey"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ViewPatientRequestsPendingTable;