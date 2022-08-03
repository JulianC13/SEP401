let idAppointment = document.getElementById('idAppointment')
asyncCall(idAppointment)

async function asyncCall(idAppointment) {
    let data = await obtenerInfoAppointmentDb(idAppointment.value)
    console.log(data);
    let dat = document.getElementById('AppDate')
    let spe = document.getElementById('Specialist')
    let status = document.getElementById('Status')
    dat.innerHTML = data.date
    spe.innerHTML = data.specialist
    status.innerHTML = data.status


  }