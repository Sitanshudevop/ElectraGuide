package com.voxagent.core.ports;

import com.voxagent.core.domain.SourceRecord;
import java.util.Optional;

public interface SourceRegistryPort {
    /**
     * Finds a source record by its unique ID.
     * Must be implemented with O(log n) complexity or better.
     */
    Optional<SourceRecord> findById(String sourceId);
    
    /**
     * Adds or updates a source record in the registry.
     * Must be implemented with O(log n) complexity or better.
     */
    void save(SourceRecord record);
}
