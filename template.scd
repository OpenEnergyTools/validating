<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4" >
    <Header id="InvalidTemplates" />
    <DataTypeTemplates>
        <LNodeType lnClass="PTOC" id="PTOC" >
            <DO name="Op" type="ACT" />
            <DO name="Str" type="ACD" />
        </LNodeType>
        <DOType cdc="ACT" id="ACT" >
            <DA name="general" bType="BOOLEAN" dchg="true" fc="ST" />
            <DA name="q" bType="Timestamp" fc="ST" />
        </DOType>
        <DOType cdc="ACT" id="ACD" >
            <DA name="general" bType="BOOLEAN" dchg="true" fc="ST" />
            <DA name="q" bType="Timestamp" fc="ST" />
        </DOType>
    </DataTypeTemplates>
</SCL>
