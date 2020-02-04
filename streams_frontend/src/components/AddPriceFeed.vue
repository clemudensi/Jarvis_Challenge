<template>
    <div>
        <b-button v-b-modal.modal-1>Add Price Feed</b-button>

        <b-modal hide-footer id="modal-1" ref="my-modal" title="Add Price Feed">
            <div>
                <b-form @reset="onReset" v-if="show">
                    <b-form-group
                            description="exchange commission."
                            id="input-group-1"
                            label="Commission"
                            label-for="input-1"
                    >
                        <b-form-input
                                id="input-1"
                                placeholder="Enter commission"
                                required
                                type="number"
                                v-model="form.commission"
                        />
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Provider Name:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                placeholder="Enter providerName"
                                required
                                v-model="form.providerName"
                        />
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Symbol" label-for="input-3">
                        <b-form-select
                                :options="symbols"
                                id="input-3"
                                required
                                v-model="form.symbol"
                        />
                    </b-form-group>

                    <b-button @click="addPriceFeed" id="my-modal" type="submit" variant="primary">Submit</b-button>
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
    import {ajax} from 'rxjs/ajax';
    import { map } from 'rxjs/operators'

    export default {
        providerName: "AddPriceFeed",
        data() {
            return {
                form: {
                    commission: '',
                    providerName: '',
                    symbol: null
                },
                symbols: [{text: 'Select One', value: null}, 'BTC/USD', 'EUR/USD', 'USD/BTC', 'USD/EUR'],
                show: true
            }
        },
        methods: {
            addPriceFeed () {
                ajax({
                    url: `http://localhost:80/api/pricefeed/new`,
                    method: "POST",
                    body: this.form
                }).pipe(map(data => {
                    console.log(data.response, 'data.response');
                    return data.response
                }));
                this.hideModal();
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
