<template>
    <div>
        <b-button v-b-modal.modal-1>Add Price Feed</b-button>

        <b-modal ref="my-modal" hide-footer id="modal-1" title="Add Price Feed">
            <div>
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group
                            id="input-group-1"
                            label="Commission"
                            label-for="input-1"
                            description="exchange commission."
                    >
                        <b-form-input
                                id="input-1"
                                v-model="form.commission"
                                type="number"
                                required
                                placeholder="Enter commission"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Provider Name:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                v-model="form.providerName"
                                required
                                placeholder="Enter providerName"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Symbol" label-for="input-3">
                        <b-form-select
                                id="input-3"
                                v-model="form.symbol"
                                :options="symbols"
                                required
                        ></b-form-select>
                    </b-form-group>

                    <b-button id="my-modal" type="submit" variant="primary" @click="hideModal">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
                <b-card class="mt-3" header="Form Data Result">
                    <pre class="m-0">{{ form }}</pre>
                </b-card>
            </div>
        </b-modal>
    </div>
</template>

<script>
  import request from 'request';

  export default {
    providerName: "AddPriceFeed",
    data() {
      return {
        form: {
          commission: '',
          providerName: '',
          symbol: null
        },
        symbols: [{ text: 'Select One', value: null }, 'BTC/USD', 'EUR/USD', 'USD/BTC', 'USD/EUR'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        request({
          method: 'POST',
          uri: 'http://localhost:80/api/pricefeed/new',
          body: this.form,
          json: true
        });
        alert(JSON.stringify(this.form))
      },
      hideModal() {
        this.form.commission.length > 0 &&
        this.form.providerName.length > 0 &&
        this.form.commission.length > 0 ?
        this.$refs['my-modal'].hide() : null
      },
      onReset(evt) {
        evt.preventDefault();
        // Reset our form values
        this.form.commission = '';
        this.form.providerName = '';
        this.form.symbol = null;
        this.form.checked = [];
      }
    }
  }
</script>

<style scoped>

</style>
