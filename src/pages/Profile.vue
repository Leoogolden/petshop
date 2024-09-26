<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore';

defineProps({
  msg: String,
})

const name = ref('')
const mail = ref('')
const direccion = ref('')
const telefono = ref('')

const userStore = useUserStore()
if (userStore.user != undefined) {
  name.value = userStore.user.name
  mail.value = userStore.user.mail
  direccion.value = userStore.user.address
  telefono.value = userStore.user.phone
}

const updateUser = () => {
  const updatedUser = {
    name: name.value,
    mail: mail.value,
    address: direccion.value,
    telefono: telefono.value
  }

  axios.put(`https://665e469e1e9017dc16ef8783.mockapi.io/Users/${userStore.user.id}`, updatedUser)
    .then(res => console.log('User updated:', res.data))
    .catch(error => console.log('Error updating user:', error))
}

</script>

<template>
  <div class="h-full bg-gray-100 mt-20">
    <form @submit.prevent="updateUser">
      <div class="border-b-2 block md:flex">

        <div class="w-full md:w-2/5 p-4 sm:p6 lg:p-8 bg-[#ee9a85] shadow-md">
          <div class="flex justify-center">
            <span class="text-xl text-white font-semibold">Perfil de Usuario</span>
          </div>

          <div class="w-full p-8 mx-2 flex justify-center">
            <img id="showImage" class="max-w-xs w-80 items-center border"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEBIVFRUXFxUVFRUXFRUWFRUWFRUWFhUVFhUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGBAQGi0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBQYEB//EADoQAAEDAgMGAwYEBgIDAAAAAAEAAhEDIQQxQQUGElFhcSKBkRMyobHB8EJS0eEHFBUjcvEzYiSSsv/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAqEQACAgICAQIFBAMAAAAAAAAAAQIRAyESMQRBURMyYXGRIjOhsQUUFf/aAAwDAQACEQMRAD8AI1FYENoRmBUfYBWIzUJgXZRpc45fqOhQKTSEwI7EOmEVgSAmFIBIKQQSxKQTAKUIJFCcBKE7QmS2NCknA6/D90zggViSSSAQAkk5CUIAZMpAJQmAwSATgJBACSCkG/f0CTgNNUE8t0RhNCkUkDGSKdJADJk6SBjJJJ4QKxk6aFIICxoSTpIAyTEVqG0LpYwjxdYm2fJI6G6D0mxmAbxz8u+SM5+k9DfPvzPVBD7QBGflOYHRTYEEpXthmIrUNqK1Ipk2qYCiFNqCGOFKEwUoTIbGUgNEoUkESOirRAFtEDgIzFvuFOkRmZtEDqovdJkoM430QhIKSaEzSxJoUoSQFjQknKSAsZINTgTYJB3T71BQS37Dh1rffbqOaiklCBpUMmlOoFBSJJilKYlAyQTlQlc2Kx9OmCXvAjTXtAQ3Qm0uzsRqFIG5usrU3spgw2m92kmB6c1Fu8rw4D2Y4SYBBdJHRQ8iOeWaHVmodSuQ28JiFz4XaDKrf7RsDDhqD9R16IoKpNPaNYfqVkoSTJJlmVaF003keaC0IzAkdNIIwI7AhsCOwIAIxqK0KDAjBIljBTamAUgmiGSUgohThBDEE6YJ0xEpTJk4QSPCRCcOSQIZKE6kxhOSAboHCULqFDv8kCu8NtF/VYS8nHEz+LF9EYTkSuQ47MT8APon/nT0PkPSQsf96Hsx8jo4UlGliQ78PofoU76rR7zuH/K3pz8lvDyMc+mPmvUZyQpk6FZjePeR9BwFNoj8x+nJZjEbwYqv4W1HmToYEZ5dEpZ0vl2RLyIrSPSK1VjPfqMb3cNegVbjd4aDPdJqHk2w9SF50wPDjxEk6knXmuhtWBlJQpyfZzz8ufoWW1N5K7yQwljeTT8CcyqE13uMucYmfM6dSuptIuGZgZnTt3XZgsDcFwgDJPRxynKTtsnhGAtlwjln6wues8ts1xI/LynMqwx1YAWiPn+yzlXFF9QMDS5xMNAnMm3dS+hK7N/uZRik9/DHEWtF8wwGbdyr9AweHFOmymPwNDbZT+I+ZkroC2xx4xSPcxR4wSIkJKcJKyzONCMwILUdgUnQFajMQmorUCDsRAUJimCkSwgKlKGFP5pkMICnlDBUgUE0SBTyoJ5TFRMFKVAFPKBUTCPSwz3ZNJ8reqHhcyT+G/nIACvaVYgRKznPicefyPhvilsrjgiLHMrm25j2YZnjIEDM2m146q2YQ3iqPNhfsF4p/ELeI1ajnNMsYeBg0LzFjzEgH9Nco3Ps4MuaUu2azEfxMw1MhpbPcG3SRMHyCuMHvRgsQ0Eu4OKQDMtPZwlp9QvCMNiKFOk7jo+1rOk8b/cbOUQ6eZyubKexaD2yeFzXPADOFzmOBzBLBYt/ytYRKqWGLRnHLJM9zxmzC69N7Xt0INxN1Xua+nPFnbO32VWbp7AcCagrVGOtLGuIA5yCCPRaTH7PfctfxTmwxHWOq8/Jhp6PQx5b7OLD1tZjpEfFaRlFtWnBErINwzmuEBwGoOQWk2JiJHCD1Cyhp0zTIrjaPP8AfPYnA4FhMEkRHxB5Lq3T2TwU31Kg0Ji3oJ8lY74ipUxDOFnExpBMZych6rs2vUFHDTWaRxSBJ4ZJvEDP9l3QWkccmee4/Hsc88Ajr27o2GwxdcmypKtTxGD4ZnqOy1m7OGFUWcD2+vVbmTE3BnQeS6HM4Wy4ZLRUtmtpDieQslvVtoE8DCDGoySWxUVO2dqN91ot1hWe4GANSqcQ4Dgp2ab+Koco6DP0Wd2Rsupi6opi03Los1ozcSvWcBhG0abKVMQ1ogczzcepN1SjydHX4eFzlyfSOoKQUQnK6D1WTBSUEkhUZ5qMwoTUVoSOkM0orUBoR2JCCtKmChhECCWTBUgUOVKUE0TBTgqEp5QTRMlKUMuTcaY+IXiTkoTTOS6qeFJuSAPIn0CGzOc4Q+Z0YBmMxuJx1Sgz/jpVWcLZ4fdeJcQMxDXGSbR1XrAdwCCZMdrrOYDZ9KhWqVqdM+0qwHPNyQLBrR+ETcwuivX4wQWEc5kdbEC+nqVyTyJvR4jg3Ju7AbZxT6r/AGTSYIg2tcwc81jdvbt+zAJaKjiLNIMuLQXcQ4T4SDy+S3eEwvBY30BOcTME65Su/wDkxUguElupFxIg27JRk0JxXqeH/wBPxBdFKjTZxniL4k+ISY4vcPQRnIWq3b3VbS8Rl9TVxuRN5kdV6QdjU7kN7gEx5ropYYAZD0TlNsmKUTMUnweETAtqDPKV3Ne1sEyPMHzldWM2e10loMie2vJZKvWNNxDjaYnlP0WLZ0LZpcXSa8EgdlxYZpY6RlMHugbIxPFAJ0HaIt9Piu3aFAhjozAJ6SFy5Fs6sb1QXZFRjxxEgniN+ZaYI+B9EHfjY5xWHAYCXsJc0NjiNogSQL2ucr5rBbC3h9kHNrOj+489Ye4uEdZcVp6e/IgNbHDq/p0ldcZOGmcko8naPMnYCox/DUbwkTY2hX2wMWzDkuEf9hGfZaivjKFclwAI5NDR5krir4XDAOexjXFolzc3+Qm605pi4nDtPbrsRZuRsBMSFUYbY5rVRTZBefRo5lKltA1qgpUsO8SQLAA37my9B2VsxmGZwsu8++83JP5QeQWkU3pFYsLyy+gPY+yGYZnCy7j77/zdByau8JJwF0xiktHrwioKkO1JMEpVFChJJJAFA1FYghGpiTZQbhmIrVBvQSNTH3CIy/Q6cj0SJsI0qTVAKYKAJhOFEFPKBDkpi5Dq12sBdUcGtES45XMD5oeD2hRrSKL5ImxESB+JvMKXJJ0IliMS1gLnuAA1P3mqDHbwk2oZ/mIB9G8+6y28u8cYl7XtJbTJa1pykGCY1JM+UKsxG9vFZrAAMuf3krtHj+V503Jwx6XuaV+0cQJf7QvAmdIGthktTuhvEalny1otIDYsDMW7XXnmzse6s1znyASIIgAmbNBOpNr6lX+wKwpvAABDQ1rbz4WieFxm0HWLqJpNHncm3cme04ekxwuZ9EWpgGflCzGzdpe292lZrmEOcbGRMtN5Ikeq0dKu4AyBmNSZH0PZZ0gtoRwoySbhAwWNuS6WP4sk1WnbQpcUHJlbX2g1nvW9fouD+sNeSATblP6WXZjMFSd74I5kEj1hVGJ3bpe/SLh/iQfilxLTRYYeqc8xzmVjv4hUnU4qNyNjHPQrU4Cm9h4SSbet1xb+Ug7CuIEkWA75SNbrKUaNoSMZu5jZdBOg+/j8Fv60OZb8t/ReZ7AdwvAewDUwCDmQDGQ9F6Ps4S250ie31WGRHRjejx/aeznOqkRYEg20k+iMcIXltJokWBGp7xdaTe6s2gKhAmoXANtcEiZPqo/wgwpqBz33cahlx1iCtHbSYlxTaLHBbm0aDRD6oc4eIBwgdBIK5q+6TRxHD1HNcYu4yQRqHDLstVj2FtR7ToT6aLnBXasMao7o4IOKZXbG2OMOC4u9pVPvVIA0vwwPirIJFMFrGCitG8IKKpEgUkwTwqGMogozWxc/OJ5joUJ33p8ECi7YgUlFJMuiiC6KeR8vrb75LnajU3R9RzWZoyywldoaATEJGlm4mATYRdctGAQdM+vaER9UuMn05JGajvQSZTobSphBpRMFOohOgRn99XkYcdajf/lyxWFxbmPD2EgtIc0r0HeKiH4epI90B/8A6GT8JXmFarwk3yPw0+aynG2c+XM8clRf747C/nKX9QwoE8P/AJFObgtF3Aa20+a8+oYbiJffhaJcJEn9G5X0W+3U29/L1If4qTwW1W5yCDeO0oW+m578Of5rCf3KB8bXtHibOYeALt6/unF+jPL83Cm/iQ6f9mdbWdRqEPjhAgNJB4iG+7P5ASbxcq32Ji3PcRNyCOI5wGwSAemp5d1laLS88bzbLy0AOgHJabd+r7Oqwx4QCc4s5pz6/sFRwJHr2wvCKTAQ1vE0tDbG7SBxk3IJkeRWkw5aJaJnic4iSYJJnXJeabH3vY1pbMuLWiYv4bNgf4z18JWr2ftNrKDcTiKjabbuMmLEjhjmTe3VRRTRrWvgX00Cr9rbxUcO0urVA0AExMkxEwBc5j1Xm22P4oCoKowzYDBd5zN5gC17Ed3CVksDsjEbQIfXe5wc5ziATBL+Hwzl+EWCOuxJWa9uLxu1cQ4BwpYdrnMLeI+OLeEgeI63ysvQtitNNgaZEWgzFpynRU26+xfYkMLRAHW/EZMrWPp+Ea/sldjetAauYd0VJvJVDaAFQw4z8Sr1sG3L4rK73s4zw8iD0PmclEmXBGc2dRFRzeG8G5zEXt1/ZbnZlMMb9fvus7hcD4Q2mBH4jlJ1WgxFL2VKGgccWtZs/VYyWzojpUee75PdWqu4R4WAgf5anyE+i1X8K9nup0riNfM3KqDhhxBoFifU5mV6Ru7RDaYAELSMekZZJ6ZS7xMiu6NQCfRVwVlvH/zu7N+SrQu1dHteP+1H7ISQTJSqNiSlHecunbtbNMwTN76DnzUHOOSCO3RJz5+vXyUCUwKYlMtRoeUlDiSQVRShEahNRWrI0DNRGlBaitQAZhUwhNRAUCJgp1EKQSERcF5VvRsd2HqEAEsMlh5s5d25HpBXq5C5sdgWVWllRocD8DzBFweoSZjnxLJGvU8Zo1YMH/R0W53T3rfhgG1ZdROX/XmuPbW4zh4sMeMfkcQHDs7Ij0VRhsHXpeF1J8T7pY79I9EmrPOXPE+M1r+D2HZlLA1f7lKnQk5kMYHSeoCba7MK0TVDScmsbdxOgsvNMNTFOm6pUp1KbAQS6XNaPPvCrdq73As9nhGkSIdVdMkamXXJ72SSYpPHDb/AbeLas4lraVMQJ/tsjM5NcRrc+q7cfig+m1xcw1DxAy8kBpdxEACzeGbWyF+uSwNQt4bEzDjo4iSXX6jVaDY2D9s4cLZfPiAg8Y4pDYi3LyT0jilNzbZxs2Y+uGMp0hwt4S+7QXGRMA5NmL9SvYtytmj2TXObwxI4SIiCQdVLZe7LRSLKkS/h4oF4mXMnQWb9wtOCyk0MnTLU9FL2ZtpdBaNICXHX6Ks27tyjh28VZ4b+Vou49mhcm8u1ajaTxQsQM9fJeS4tz6jy55LnHMkyUUOWOUacvU3dPeepXHHQBYwOi/vEak6BdGBqOrXe3xdb/NUO4tUNLqL9TI6gr0HDYZoOQUtAnRPBYZrQCAJ0XPj7C9yTHmVaAxdVzYe1ztWvt5gBTSQcmV2B2SHAnqY9Vstn0uFgCp8ECBYK9oGyuK2RN6MxvUyKwPNo+BIVOtLvVhSQ2oMmyHdAcis0t49HueFNSwx+mhiE0KRUJVnWOCmcmlKUDoaVEqRUZTKIp06SZRSBEahBEasSgzSitKA1TagDoaUQFAaURpSYgzSpBCaUQFAmiYKShKkCgmhi1KE6dAAcRRD2OY+7XAgjoQvNsf8Aw9rBxNJwcDPQjofXTkvToUglRz5/Ghm+Y862fue5hJeyToAHRMi3UWhbnY2z3MZwFjGg6NHDYWucyYj0XcHFPKOJyf8APj7ln/UIs3Pnp5Lk9oTLvxOsXfiIGQlBaFwbZxsDgbY5E99FM5RgrNHixYVpD4/aTf8AjaQXG3MNGvdZTbWCdSdxNFiu3DXqgZgfNWWNpe0pxyWeObltnn+VkcmZXA1SciQ4QQRmIP7r0vdrFvcz+4QTz5rzCqPZPyOavtj7ddTaGjI81ozlPQMXtFscIN0+yR4Hg63WSZiC90nVX2xcRFSCbGyzZS6LuhfJW2HMCFxMogTGa7aDYF1aM2dD2BzS0iQRBWFx+G9nUczkbdRot0wqg3owcxUaL5HqNFpFnX4GXhk4vpmbKgVJRK0PeQ0qKcpJlDSmKdMUDQ0p0ySBlG1FaUIKYKzLQVpRWoLURpQFBmqYQmlFBSEECcFDBUwgAoKcKAUggljynCinCBEk4UQpBAmOE4TBOEWSwjTALuQt3OSzG1nHXutq3Al9IAGCST9AuHGbry2C6T2XJmUpSPIz54ubV9aMrs2nULhUa2QOlv8AasHVHgGWxyjkr7ZuE9hT4CqzaNaZDIkc9VpjjRw5J8mYva0k9fvNceH4hHT65ru2g88RJ81x0at+i1M0zX7PqB1IEZ6hHw7+BwPVVGznDQ6evVWoY5xAAUSRaZ6LhKnEGu0IBXTUqxZV1E+zYxrswBZL+Yn1TRBc03WXPtRnFTPS/omo1JRnXHkh7VBF1JMxOKpfib59+a5CrQsh5bmDIVa4QYR4+RyjT7R9H4+TkqIFMSnKjK6DpHlQlOolBSQuJMkUkxlKCpNKGFJqzKQZpR6bJy+yckGiybTH3yXU6pEW8rWHLq080Eyl6Ii0wptKCERqRVBWlTBQWogKBUFBUgUKVIFIVE06HKI23fQfVBL0TAPI+icFO+i4CfW6gDPf5oM07JKbUIOR8GJe3ugJvimzR4UcLROgCQqzmVUbU2oGw0ZpVsQQywv8VJ8rJ8m2C29iQ0G6xFfaJDpHW3NaaphHVLusOWqjh93WEyRJSsDG7TBcOICAbqop1CHSRZeobS2E00jGYFl5/Uwvi4dSY5KkwOvYtJz6g/KcgvSNmYIUmmo+4aJFlSbs7MDROc388ovkDzWm2mw+xjTXnAUsozGN285xc89Y+QC6d1tovqudxZDXus/tLDkDpPF+y6t38fwSAIuB3sgZ6Th3cl0xYqk2VigR3VphcRJLSgmjN1Z9o779FwYn3nd1o9oYEFxIF9FnMafGfvRRhjxmz2vAny/AElN2SCm2kXZWA5/ea6j0m6BlQcVJ0gkHz/VQeP2QVEfiSUEkF0VACkyNfgkkkB1PyueoA5ECI5DOdVHim6SSRMOrJtRGlMkgsmCptKSSRI8qQKZJAE5Ui7I/cg/6SSSIfodTK5f4QI5n9AhVngWaOhOpSSQZqK5UD4kfBvhw8/knSQxZ/wBuX2Y2JwzC4VDM6IeJxf4RZJJSfKhGP4QC51jlAuuwYwBzWNzPyGaSSljRz4/HkDpks48NLuNuRzkc5gf4ykkmgNTu84cNsp+n+1oKkObGiSSRRkttYYC3MquOCi7QkkgotNh4uHwfL6q3wmL/AL8ffdJJAi42jUim5wzAPyWGc9JJaxPZ/wAUlwk/qMx2fY/qiUcTw2iUklR6jinaYSpA8TxJOQ0C43PlJJMWJasjxJJJIND/2Q=="
              alt="">
          </div>
        </div>

        <div class="w-full md:w-3/5 p-8 bg-[#ee9a85] lg:ml-4 shadow-md">
          <div class="rounded shadow p-6 bg-gray-400">
            <div class="pb-6">
              <label for="name" class="font-semibold text-white pb-1">Nombre</label>
              <div class="flex">
                <input id="name" v-model="name" class="border-1 rounded-r px-4 py-2 w-full outline-none" type="text" />
              </div>
            </div>
            <div class="pb-4">
              <label for="email" class="font-semibold text-white pb-1">Email</label>
              <input id="email" v-model="mail" class="border-1 rounded-r px-4 py-2 w-full outline-none" type="email" />
            </div>
            <div class="pb-4">
              <label for="direccion" class="font-semibold text-white pb-1">Direccion</label>
              <input id="direccion" v-model="direccion" class="border-1 rounded-r px-4 py-2 w-full outline-none" type="text" />
            </div>
            <div class="pb-4">
              <label for="telefono" class="font-semibold text-white pb-1">Telefono</label>
              <input id="telefono" v-model="telefono" class="border-1 rounded-r px-4 py-2 w-full outline-none" type="text" />
            </div>
            <div class="pb-4">
              <button
                class="group relative h-12 w-48 overflow-hidden rounded-2xl bg-[#eeb3a5] text-lg font-bold text-white">
                Guardar
                <div
                  class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30">
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </form>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>