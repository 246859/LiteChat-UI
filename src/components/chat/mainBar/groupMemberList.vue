<template>
  <div>
    <div class="group-member-count">
      群成员{{ ` (${memberList.length})` }}
    </div>
    <!--    <el-input-->
    <!--        v-model="content"-->
    <!--        :prefix-icon="Search"-->
    <!--        class="w-50 m-2 group-member-search"-->
    <!--        size="small"-->
    <!--    />-->
  </div>

  <div>

    <el-scrollbar height="775px">
      <div class="memberList-box">
        <ul>
          <li v-for="member in memberList" class="color-hover-grey">
            <group-member-card
                :avatar="require('../../../assets/img/avatar/jojo.jpg')"
                :name="member.nickName"
                :role="member.roleId"
            />
          </li>
        </ul>
      </div>
    </el-scrollbar>

  </div>

</template>

<script>
import GroupMemberCard from "@/components/chat/mainBar/groupMemberCard";
import {reactive, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import {getGroupMembersService} from "@/view/chat/service/chatService";
import {errorTips} from "@/utils/messageTips";

export default {
  name: "groupMemberList",
  components: {GroupMemberCard},
  props: {
    groupId: String,
  },
  setup(props) {
    let content = ref("");
    const memberList = reactive([]);

    //请求群员列表
    getGroupMembersService(props.groupId).then(res => {
      if (res.data.code === 200) {
        memberList.push(...res.data.data);
      }
    }).catch(err => {
      console.log(err)
    });

    return {
      memberList,
      Search,
      content
    }
  }
}
</script>

<style scoped>
li {
  margin: 18px 0;
}

.memberList-box {
  padding: 0px 10px;
}

.group-member-search {
  padding: 5px 10px 0px 10px;
  background: rgb(245, 246, 247);
}

.group-member-count {
  padding: 5px 20px 5px 10px;
  font-size: 16px;
}

*:hover {
  cursor: default;
}

</style>