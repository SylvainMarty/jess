<template>
    <mu-card>
        <mu-card-title title="Project selection"/>
        <mu-card-text>
            <mu-text-field label="Current project" labelFloat fullWidth disabled/><br/>
            <mu-raised-button icon="add" label="Add project" fullWidth/>
            <div class="mu-text-field has-label full-width">
                <div class="mu-text-field-content">
                    <label class="jess-existing-prj-label">
                        Pick an existing project &nbsp;<mu-badge content="5" secondary/>
                    </label>
                    <div class="jess-existing-prj-list">
                        <mu-list>
                            <mu-list-item title="Refresh">
                                <mu-icon slot="right" value="input"/>
                            </mu-list-item>
                            <mu-list-item title="Help & feedback">
                                <mu-icon slot="right" value="input"/>
                            </mu-list-item>
                            <mu-list-item title="Settings">
                                <mu-icon slot="right" value="input"/>
                            </mu-list-item>
                            <mu-list-item title="Sign out">
                                <mu-icon slot="right" value="input"/>
                            </mu-list-item>
                            <mu-list-item title="Follow up">
                                <mu-icon slot="right" value="input"/>
                            </mu-list-item>
                        </mu-list>
                    </div>
                </div>
            </div>
        </mu-card-text>
    </mu-card>
</template>

<script>
export default {}
</script>

<style scoped>
.jess-existing-prj-label {
    line-height: 20px;
    font-size: 14px;
    color: rgba(0,0,0,.38);
}
.jess-existing-prj-list {
  overflow-y: scroll;
  max-height: 150px;
}
</style>

