// checkout page using vue 3
<template>
    <div class="checkoutContainer">
        <!-- <div v-if="$fetchState.pending">Loading...</div>
        <div v-else-if="$fetchState.error">Error loading data</div> -->
        <div class="form">
            {{ order }}
            <form :action="apiEndpoint" method="post">
                <input type="text" name="MerchantID" :value="order.MerchantID" />
                <input type="text" name="TradeSha" :value="order.shaEncrypt" />
                <input
                type="text"
                name="TradeInfo"
                :value="order.aesEncrypt"
                />
                <input type="text" name="TimeStamp" :value="order.order.TimeStamp" />
                <input type="text" name="Version" value="1.5" />
                <input type="text" name="MerchantOrderNo" :value="order.order.MerchantOrderNo" />
                <input type="text" name="Amt" :value="order.order.Amt" />
                <input type="email" name="Email" :value="order.order.Email" />
                <button type="submit">送出</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
// 需要call hello api 來取得上方template 需要的資料
import { defineComponent, ref, computed } from 'vue'
// 定義order data
const order = ref({
  aesEncrypt: '',
  shaEncrypt: '',
  MerchantID : "MS3129040116",
  order: {
    TimeStamp: Math.floor(Date.now() / 1000),
    MerchantOrderNo: '',
    Amt: '',
    Email: ''
  }
})

// 定義apiendpoint 如果是 production 就是正式環境 如果是 development 就是開發環境
const apiEndpoint = computed(() => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://core.spgateway.com/MPG/mpg_gateway'
  } else {
    return 'https://ccore.newebpay.com/MPG/mpg_gateway'
  }
})

// 使用 nuxt fetch 呼叫後端 hello api 來取得 order, aesEncrypt, shaEncrypt
const randomOrderId = Date.now()
const { data } = await useAsyncData('orderFetch', () => $fetch(`/newebpay/${randomOrderId}`))
console.log(`data : `, data.value.data)
const payment = data.value.data
order.value.aesEncrypt = payment.aesEncrypt
order.value.shaEncrypt = payment.shaEncrypt
order.value.order.MerchantOrderNo = payment.order.id
order.value.order.Amt = payment.order.total
order.value.order.Email = payment.order.email
order.value.MerchantID = payment.MerchantID
</script>


<style lang="sass">
.checkoutContainer
    display: flex
    justify-content: center
    align-items: center
    height: 100%
    width: 100%
    max-width: 500px
    margin: 8px auto
    border: 1px solid #ededed
    color : #fff
    .form
        width: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        form
            width: 80%
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            padding-top: 16px
            color : #000
            button
                width: 50%
                background-color: #dededd
                border-radius: 8px  
                padding: 8px
                margin: 8px

    
</style>