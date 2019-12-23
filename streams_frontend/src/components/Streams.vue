<template>
 <section>
     <h1>{{interval$}}</h1>
     <p>{{message$}}</p>
 </section>
</template>

<script>
  import { interval, from }  from 'rxjs'
  const messageObservable = from(
    ['Example Message', 'Example Message Final']
  );

  export default {
    name: "Streams",
    subscriptions() {
      const interval$ = interval(1000);
      return {
        interval$,
        message$: messageObservable
      }
    }
  }
</script>

<style scoped>

</style>
