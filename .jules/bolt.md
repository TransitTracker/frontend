
## 2023-10-25 - Vue 2 Reactivity Overhead with $delete Loops
**Learning:** In Vue 2, iterating over object keys and calling `this.$delete` triggers the reactivity system and potential virtual DOM updates sequentially for every key. This causes O(N) reactivity overhead which can become a bottleneck when replacing lists of items or clearing cache.
**Action:** Always reassign the reactive object entirely (e.g., `this.obj = {}`) when clearing it, rather than looping with `this.$delete` or `Vue.delete`.
