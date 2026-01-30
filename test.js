/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  let count = 0;
  let streak = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) continue;
    //console.log(streak)
    if (nums[i + 1] - nums[i] > 1) {
      streak++;
      count = Math.max(count, streak);
      console.log({ count });
      streak = 0;
    } else {
      streak++;
    }
  }
  return Math.max(count, streak);
};

longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]);
