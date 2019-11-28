<template>
  <div>
    <h2>我是 profile </h2>
    <p>{{ $route.query }}</p>
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>